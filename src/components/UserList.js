import React, { useState, useEffect } from "react";
import { db } from '../backend/firebase';
import $ from "jquery";
import "datatables.net";
import { getUsersList } from "../backend/api";
import { collection, getDocs } from "firebase/firestore";
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


export const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(collection(db, "users"));
                const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(users);
                console.log("users:: ", users);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
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
            dom: 'l<"float-end"B>rtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    text: 'Export to PDF',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6],
                    },
                },
                {
                    extend: 'excelHtml5',
                    text: 'Export to Excel',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6],
                    },
                },
                {
                    extend: 'print',
                    text: 'Print',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6],
                    },
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
            <h2 className="mt-3 mb-3">User List</h2>
            <table className="table table-striped table-bordered" id="userTable" />
        </div>
    );
}