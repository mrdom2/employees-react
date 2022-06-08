import { Component } from "react";
import _ from "lodash";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filer";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { name: "Jack Shapard", salary: 1800, increase: false, rise: false, id: _.uniqueId() },
                { name: "John Lock", salary: 950, increase: true, rise: false, id: _.uniqueId() },
                { name: "Daniel Faraday", salary: 3500, increase: false, rise: false, id: _.uniqueId() }
            ],
            term: "",
            filter: "all"
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: _.uniqueId()
        };

        this.setState(({ data }) => {
            const newData = [...data, newItem];
            return {
                data: newData
            }
        });
    }

    // onToggleIncrease = (id) => {
    //     this.setState(({ data }) => {
    //         const index = data.findIndex(elem => elem.id === id);
    //         const old = data[index];
    //         const newItem = { ...old, increase: !old.increase };
    //         const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //         return {
    //             data: newArray
    //         }
    //     })

    //     this.setState(({ data }) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return { ...item, increase: !item.increase }
    //             }
    //             return item;
    //         })
    //     }));
    // }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }));
    }

    searchEmployee = (items, term, filter) => {
        if (term) {
            return items.filter(item => item.name.indexOf(term) > -1);
        }
        else return items;
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter(item => item.rise);
            case "more1000":
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state;
        const employeesCount = data.length;
        const increased = data.filter(item => item.increase).length;

        const visibleData = this.filterPost(this.searchEmployee(data, term), filter);

        return (
            <div className="app">
                <AppInfo employeesCount={employeesCount} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm
                    onSubmitForm={this.addItem} />
            </div>
        );
    }
}

export default App;