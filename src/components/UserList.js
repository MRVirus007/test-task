import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsersList } from "../backend/api";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
//For buttons like print
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
//For search bar
import "datatables.net-searchpanes/js/dataTables.searchPanes.min.js";
import "datatables.net-searchpanes-bs5/css/searchPanes.bootstrap5.min.css";
import "datatables.net-select-bs5/css/select.bootstrap5.min.css";
import "datatables.net-select/js/dataTables.select.min.js";
//responsive
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsersList().then((userList) => {
            setUsers(userList);
        }).catch(err => console.log("Error: ", err));
    }, []);

    useEffect(() => {
        const table = $('#userTable').DataTable({
            data: users,
            columns: [
                { title: 'Name', data: 'name' },
                { title: 'Age/Sex', data: row => `${calculateAge(row.age)}Y/${row.sex}` },
                { title: 'Mobile', data: 'mobile' },
                { title: 'Address', data: row => `${row.address.addressLine}, ${row.address.city}, ${row.address.state}, ${row.address.pincode}` },
                { title: 'Govt ID', data: row => `${row.idType}: ${row.govtId}` },
                { title: 'Guardian Details', data: row => `${row.guardianDetails.title} ${row.guardianDetails.name}` },
                { title: 'Nationality', data: 'nationality' },
            ],
            dom: '<"d-flex justify-content-between align-items-center"lBf><"float-end mb-3">rtip',
            "language": {
                "paginate": {
                    "previous": "Prev",
                    "next": "Next"
                }
            },
            "drawCallback": function () {
                $('a.paginate_button').addClass('btn btn-sm btn-dark mx-1');
            },
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Excel',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6],
                    },
                },
                {
                    extend: 'print',
                    text: 'Print',
                    className: 'btn btn-light'
                },
            ],
            searching: true,
            searchPanes: {
                columns: [0, 1, 2, 3, 4, 5, 6],
            },
        });
        return () => {
            table.destroy();
        };
    }, [users]);

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div className="container">
            <Link to="/register" className="btn btn-outline-success mt-3">
                Add User
            </Link>
            <h2 className="mt-3 mb-3">User List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered dt-button" id="userTable" />
            </div>
        </div>
    );
}