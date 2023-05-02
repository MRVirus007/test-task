import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddUserForm } from './components/RegisterUser';
import Header from './components/header';
import { UserList } from './components/UserList';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<AddUserForm />} />
          <Route path="/" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
