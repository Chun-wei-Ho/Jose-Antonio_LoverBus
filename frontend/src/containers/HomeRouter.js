import React from "react";
import TourMap from './TourMap';
import TourPlan from './TourPlan';
import PlanList from './PlanList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function HomeRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">TourMap</Link>
          </li>
          <li>
            <Link to="/PlanList">PlanList</Link>
          </li>
          <li>
            <Link to="/TourPlan">TourPlan</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/PlanList">
            <PlanList />
          </Route>
          <Route path="/TourPlan">
            <TourPlan />
          </Route>
          <Route path="/">
            <TourMap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function tourMap() {
//   return <TourMap />;
// }

// function planList() {
//   return <PlanList />;
// }

// function tourPlan() {
//   return <TourPlan />;
// }