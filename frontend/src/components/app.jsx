import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import MainPage from './main/main_page';
import NavBarContainer from './nav/navbar_container';
import GroupIndexContainer from './groups/group_index_container';
import GroupShowContainer from './groups/group_show_container';
import DiscoverContainer from './acts/discover_container';
import Profile from './profile/profile';
import ActIndexItemContainer from './acts/act_index_item_container';

const App = () => (
  <div>
    <div>
      <img className="background-splash" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDnjU59BpeZA72vhC9i-Bba7AoHU418Vaa6-IZLbcupXmcZfBMw" alt="" />
    
      <NavBarContainer />
      <Switch>
        <ProtectedRoute exact path='/groups/:id' component={GroupShowContainer} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/dashboard' component={GroupIndexContainer} />
        <ProtectedRoute exact path='/discover' component={DiscoverContainer} />
        <ProtectedRoute exact path='/acts/:actId' component={ActIndexItemContainer} />
        <AuthRoute exact path='/' component={MainPage} />
      </Switch>
    </div>
  </div>
);


export default App;