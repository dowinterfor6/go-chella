import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import MainPage from './main/main_page';
import NavBarContainer from './nav/navbar_container';
import GroupIndexContainer from './groups/group_index_container';
import GroupShowContainer from './groups/group_show_container';
import DiscoverContainer from './acts/discover_container';
import Profile from './profile/profile';
import ActIndexItemContainer from './acts/act_index_item_container';
import JoinContainer from './join/join_container';

const App = () => (
  <div className="main-content" style={{ textAlign: "right"}}>
    <NavBarContainer />
    <Switch>
      <Route exact path='/invite/:groupName/:groupId' component={JoinContainer} />
      <ProtectedRoute exact path='/groups/:id' component={GroupShowContainer} />
      <ProtectedRoute exact path='/acts/:actId' component={ActIndexItemContainer} />
      <ProtectedRoute exact path='/profile' component={Profile} />
      <ProtectedRoute exact path='/dashboard' component={GroupIndexContainer} />
      <ProtectedRoute exact path='/discover' component={DiscoverContainer} />
      <AuthRoute exact path='/' component={MainPage} />
    </Switch>
  </div>
);


export default App;