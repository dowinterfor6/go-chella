# Go-chella (formerly Bro-chella)
A social planning application for the Coachella event. 

[Live Demo!](https://go-chella.herokuapp.com)

## Background and Overview
Go-chella is an application that allows users to create groups based on acts from Coachella. Within a group,users can join through invites and plan the details of their activities, such as whereabouts and location meetup. Lastly, users can also discover related acts either through their group discover page.
![splash](https://github.com/dowinterfor6/go-chella/blob/master/docs/gifs/splash.gif)

Users are greeted with a login modal upon attempted sign in:
![login](https://github.com/dowinterfor6/go-chella/blob/master/docs/gifs/session-forms.gif)

A loading screen is shown while the database is being accessed, then the dashboard loads, showing a list of all the groups the user is in:
![loading](https://github.com/dowinterfor6/go-chella/blob/master/docs/gifs/login-and-loading.gif)
![dashboard](https://github.com/dowinterfor6/go-chella/blob/master/docs/gifs/carousel.gif)

Groups are displayed alongside a map that shows the location of the events that the group will be attending:
![show](https://github.com/dowinterfor6/go-chella/blob/master/docs/images/group-show.png)

A temporary discover page that shows all the available acts and basic details: 
![discover](https://github.com/dowinterfor6/go-chella/blob/master/docs/images/acts-discover.png)

### Technologies & Technical Challenges 
- Backend: Node, Express, MongoDB 
- Frontend: React, Redux

# Code Highlights

### Cross-Document Referencing
```Javascript
/routes/api/group.js

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newGroup = new Group({
        name: req.body.name,
        owner: req.user.id,
        members: [req.user.id]
    });

    newGroup.save()
        .then((group) => group.populate('owner').execPopulate())
        .then((group) => {
            group.owner.groups.push(group.id)
            return group.owner.save()
            .then(() => {
                return group
            })
        })
        .then((group) => {
            const { name, owner } = group
            res.json({ name: name, owner: owner.id, id: group.id })
            ;
        })
});
```
Creating groups and simultaneously pushing groups into a user's Groups array proved to be something of a challenge.
We were able to use promises and Mongoose's populate() method to achieve both of these desired results, and to return to the api only the information that would be relevant upon a successful group creation.

### Setting frontend state (with loading screen)
```Javascript
/components/groups/group_index.jsx

componentDidMount() {
    document.title = 'Dashboard';

    let getUserGroups = this.props.fetchUserGroups(this.props.currentUser.id);
    getUserGroups.then((userGroups) => {
      // ...
      userGroups.data.groups.forEach((id) => {
        promise = this.props.fetchGroup(id);
        promiseArr.push(promise);
      });

      // If there are no groups
      if (promiseArr.length === 0) {
        this.setState({ numObjToLoad: 1, objLoaded: 1, loading: false });
      }

      Promise.all(promiseArr).then((res) => {
        let objToLoad = 0;
        Object.keys(this.props.groups).forEach((groupId) => {
          // Add owner
          objToLoad++;
          // Add acts
          objToLoad += this.props.groups[groupId].acts.length;
          // Add members
          objToLoad += this.props.groups[groupId].members.length;
        });
        this.setState({ numObjToLoad: objToLoad, objLoaded: 0 });

        // ...

        res.forEach(
          async (resolve) => {
            currentGroup = resolve.group.data;
            groups[currentGroup.id] = currentGroup;

            // Owner
            let ownerPromise = (ownerId, currentGroupId) => this.props.fetchOwner(ownerId, currentGroupId).then((res) => {
              return {
                data: res.data,
                id: currentGroupId
              };
            });

            // Members
            members = currentGroup.members;
            currentGroup.members = [];
            members.forEach(
              async (memberId) => {
                let memberPromise = (memberId, currentGroupId) => this.props.fetchUser(memberId, currentGroupId).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let memberResult = await memberPromise(memberId, currentGroup.id);
                memberResult.group.members.push(memberResult.data);
              }
            );

            // Acts
            acts = currentGroup.acts;
            currentGroup.acts = [];
            acts.forEach(
              async (actId) => {
                let actPromise = (actId, currentGroupId) => this.props.fetchAct(actId, currentGroupId).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let actResult = await actPromise(actId, currentGroup.id);
                actResult.group.acts.push(actResult.data);
              }
            );

            let ownerResult = await ownerPromise(currentGroup.owner, currentGroup.id);
            groups[ownerResult.id].owner = ownerResult.data;
          }
        );
        // this.setState({groups: groups, loading: false})
      });
    });
  }
```
A rather lengthy snippet of code, most of the variable declarations have been commented out to reduce the length. The premise for this componentDidMount method is to allow for a complete load of the relevant information onto the frontend state so that it is available for use immediately upon completion, allowing for a smoother UX while sacrificing the initial loading time. This allowed for a tracking system to produce an accurate loading status that represented the percentage of information loaded. This was accomplished by first parsing the number of IDs that needed a database call for full information, then completing all the promises via many Async/Await methods to process all the retrieved information, and then calling SetState with the completed information a single time. 

### Handle Large Display of group
```Javascript
/components/groups/group_index_display.jsx

componentWillReceiveProps(nextProps) {
    if (nextProps.acts) {
      let firstActUrl = nextProps.acts[Object.keys(nextProps.acts)[0]].url;
      this.setBackgroundUrl(firstActUrl);
      clearInterval(this.interval);
      if (Object.keys(nextProps.acts).length > 1) {
        this.interval = setInterval(() => {
          this.setState({ backgroundUrl: this.state.backgroundUrl + 1 })
        }, 5000);
        document.getElementsByClassName('in-focus-header')[0].classList.add('fadeIn');
        document.getElementsByClassName('act-list-container')[0].classList.add('fadeIn');
      }
    }
    this.setState({
      acts: nextProps.acts || {},
      activeGroup: nextProps.activeGroup,
      backgroundUrl: 0
    });
  }
```
Without using any external libraries or API, coding the carousel with a large display for the in focus group proved to be a little tougher than expected. By having the local state keep track of the active group, and sorting the group's acts by date, the acts were ordered by date and would appear in chronological order, as opposed to whichever loads first. As the background image is determined by the first act, this is crucial to keep some form of consistency when updating this component. Since the first implementation, this has been refactored to efficiently cycle through the acts at an interval, as well as greatly reduced the number of lines of code needed to perform the task.

## UI/UX

The goal is to maintain a minimalistic design that will allow users to create many groups, while sustaining an organized dashboard. 
- The app will have a splash page with animations of pictures of past Coachella events, as well as buttons to allow users to Signup or Login through a modal
- Upon Signing up or Logging in, the user's dashbaord will render with groups they are participating in.
The groups will render according to a chronological order starting with the next upcoming event. Only one group will appear on the dashboard at a time, while the adjacent listed groups will fade in upon scrolling in their direction, and fade out when no longer shown. 
  Additional features: 
  - scrollbar-less scrolling
  - Borderless
  - 100 vh/vw pages
  - All headers are sans-serif, body serif
  - Moment.js for relative time
- The group show page will contain a log of acts (hourly) where users can append details of their plans onto. It will also contain a map of the event staging area. There will be a carousel bar of related events that will render a modal (with prefilled date and place) upon a group creation based on that event.
- The Discover Page will render a list of related events. 
  - Events will be sorted according to the most related tags based on their previosly created groups and acts.


## Group Members & Responsibilities

### Andrew
 - User Authentication, User Dashboard/Group Carousel Component Creation/Page Styling, Discovery Page Layout, Chief CSSer, General Squasher of Bugs/Fix'er Upper

### Karen
 - Built Out React Skeleton, Full Google Maps API Integration, Groups Show Page Components, Thorough Styling
 
### Kevin
 - Primary Backend Routes/API Architect, Implementor of Group CRUD Form Functionality, Small Styling of Delete/Create Modal, Provider of Pikachu Gif

