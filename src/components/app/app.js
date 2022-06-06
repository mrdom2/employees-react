import _ from "lodash";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filer";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

function App() {

    const data = [
        { name: "Jack Shapard", salary: 800, increase: false, id: 1 },
        { name: "John Lock", salary: 400, increase: true, id: 2 },
        { name: "Daniel Faraday", salary: 500, increase: false, id: 3 },
    ];

    return (
        <div className="app">
            <AppInfo />

            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>

            <EmployeesList data={data} />
            <EmployeesAddForm />
        </div>
    );
}

export default App;