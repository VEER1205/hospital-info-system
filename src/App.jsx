import React, { useState } from 'react';
import { 
  Users, UserCheck, Stethoscope, DollarSign, 
  LogOut, Calendar, Clock, FileText, Activity,
  TrendingUp, AlertCircle, CheckCircle, User,
  Phone, Mail, MapPin, Plus, Search, Edit, Eye
} from 'lucide-react';

const HospitalInfoSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [selectedRole, setSelectedRole] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Smith', age: 45, gender: 'Male', phone: '555-0101', status: 'waiting', department: 'Cardiology', priority: 'normal', registeredAt: '09:15 AM' },
    { id: 2, name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '555-0102', status: 'in-consultation', department: 'General', priority: 'urgent', registeredAt: '09:30 AM' },
    { id: 3, name: 'Michael Brown', age: 58, gender: 'Male', phone: '555-0103', status: 'completed', department: 'Orthopedics', priority: 'normal', registeredAt: '08:45 AM' }
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [ehrs, setEhrs] = useState({
    1: { diagnosis: 'Hypertension', prescription: 'Amlodipine 5mg daily', notes: 'Monitor BP weekly', vitals: { bp: '140/90', temp: '98.6°F', pulse: '78' } },
    2: { diagnosis: 'Acute Gastritis', prescription: 'Omeprazole 20mg twice daily', notes: 'Follow up in 2 weeks', vitals: { bp: '120/80', temp: '99.1°F', pulse: '82' } },
    3: { diagnosis: 'Knee Arthritis', prescription: 'Ibuprofen 400mg as needed', notes: 'Physical therapy recommended', vitals: { bp: '130/85', temp: '98.4°F', pulse: '72' } }
  });

  const roles = [
    { id: 'receptionist', name: 'Receptionist', icon: UserCheck, color: 'bg-blue-500', password: 'recep123' },
    { id: 'doctor', name: 'Doctor', icon: Stethoscope, color: 'bg-green-500', password: 'doc123' },
    { id: 'admin', name: 'Administrator', icon: DollarSign, color: 'bg-purple-500', password: 'admin123' }
  ];

  const handleLogin = (role) => {
    if (password === role.password) {
      setCurrentUser(role);
      setCurrentView(role.id);
      setPassword('');
      setError('');
      setSelectedRole(null);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setSelectedPatient(null);
    setSelectedRole(null);
    setPassword('');
    setError('');
  };

  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: patients.length + 1,
      status: 'waiting',
      registeredAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setPatients([...patients, newPatient]);
  };

  const updatePatientStatus = (patientId, newStatus) => {
    setPatients(patients.map(p => p.id === patientId ? { ...p, status: newStatus } : p));
  };

  const updateEHR = (patientId, ehrData) => {
    setEhrs({ ...ehrs, [patientId]: ehrData });
  };

  // Login View
  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Info System</h1>
          <p className="text-gray-600 mt-2">
            {selectedRole ? 'Enter your password' : 'Select your role to continue'}
          </p>
        </div>

        {!selectedRole ? (
          <div className="space-y-3">
            {roles.map(role => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role);
                    setError('');
                  }}
                  className={`w-full ${role.color} hover:opacity-90 text-white rounded-lg p-4 flex items-center justify-center space-x-3 transition-all transform hover:scale-105`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-semibold">{role.name}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center space-x-3">
              <div className={`w-12 h-12 ${selectedRole.color} rounded-full flex items-center justify-center`}>
                <selectedRole.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{selectedRole.name}</div>
                <div className="text-sm text-gray-500">Login as {selectedRole.name.toLowerCase()}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin(selectedRole);
                    }
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    error 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  autoFocus
                />
                {error && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium">Demo Credentials:</p>
                <p className="text-xs text-blue-700 mt-1">
                  Receptionist: <span className="font-mono font-semibold">recep123</span><br/>
                  Doctor: <span className="font-mono font-semibold">doc123</span><br/>
                  Admin: <span className="font-mono font-semibold">admin123</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleLogin(selectedRole)}
                  className={`flex-1 ${selectedRole.color} hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-all`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(null);
                    setPassword('');
                    setError('');
                  }}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Receptionist View
  const ReceptionistView = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      name: '', age: '', gender: 'Male', phone: '', department: 'General', priority: 'normal'
    });

    const handleSubmit = () => {
      if (formData.name && formData.age && formData.phone) {
        addPatient(formData);
        setFormData({ name: '', age: '', gender: 'Male', phone: '', department: 'General', priority: 'normal' });
        setShowForm(false);
      }
    };

    const statusColors = {
      waiting: 'bg-yellow-100 text-yellow-800',
      'in-consultation': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };

    const priorityColors = {
      normal: 'bg-gray-100 text-gray-800',
      urgent: 'bg-red-100 text-red-800'
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Registration & Queue</h2>
            <p className="text-gray-600">Manage patient check-ins and appointments</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Patient</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Register New Patient</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option>General</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Neurology</option>
              </select>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
              <div className="col-span-2 flex space-x-3">
                <button onClick={handleSubmit} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Register Patient
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patients.map(patient => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age}Y, {patient.gender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[patient.priority]}`}>
                        {patient.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.registeredAt}</td>
                    <td className="px-6 py-4">
                      <select
                        value={patient.status}
                        onChange={(e) => updatePatientStatus(patient.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="waiting">Waiting</option>
                        <option value="in-consultation">In Consultation</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Doctor View
  const DoctorView = () => {
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [ehrForm, setEhrForm] = useState({
      diagnosis: '', prescription: '', notes: '',
      vitals: { bp: '', temp: '', pulse: '' }
    });

    const handlePatientSelect = (patient) => {
      setSelectedPatientId(patient.id);
      if (ehrs[patient.id]) {
        setEhrForm(ehrs[patient.id]);
      } else {
        setEhrForm({
          diagnosis: '', prescription: '', notes: '',
          vitals: { bp: '', temp: '', pulse: '' }
        });
      }
    };

    const handleSaveEHR = () => {
      if (selectedPatientId) {
        updateEHR(selectedPatientId, ehrForm);
        updatePatientStatus(selectedPatientId, 'completed');
        alert('EHR saved successfully!');
      }
    };

    const activePatients = patients.filter(p => p.status !== 'completed');
    const selectedPatientData = patients.find(p => p.id === selectedPatientId);

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor's Console - Consultation & EHR</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Patient Queue
            </h3>
            <div className="space-y-2">
              {activePatients.map(patient => (
                <div
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedPatientId === patient.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-gray-600">{patient.department}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{patient.registeredAt}</span>
                    {patient.priority === 'urgent' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            {selectedPatientData ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{selectedPatientData.name}</h3>
                    <p className="text-gray-600">{selectedPatientData.age}Y, {selectedPatientData.gender} • {selectedPatientData.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Department</div>
                    <div className="font-semibold">{selectedPatientData.department}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vital Signs</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Blood Pressure"
                        value={ehrForm.vitals.bp}
                        onChange={(e) => setEhrForm({
                          ...ehrForm,
                          vitals: { ...ehrForm.vitals, bp: e.target.value }
                        })}
                        className="border rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Temperature"
                        value={ehrForm.vitals.temp}
                        onChange={(e) => setEhrForm({
                          ...ehrForm,
                          vitals: { ...ehrForm.vitals, temp: e.target.value }
                        })}
                        className="border rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Pulse"
                        value={ehrForm.vitals.pulse}
                        onChange={(e) => setEhrForm({
                          ...ehrForm,
                          vitals: { ...ehrForm.vitals, pulse: e.target.value }
                        })}
                        className="border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                    <input
                      type="text"
                      value={ehrForm.diagnosis}
                      onChange={(e) => setEhrForm({ ...ehrForm, diagnosis: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter diagnosis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prescription</label>
                    <textarea
                      value={ehrForm.prescription}
                      onChange={(e) => setEhrForm({ ...ehrForm, prescription: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      rows="3"
                      placeholder="Enter prescription details"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Notes</label>
                    <textarea
                      value={ehrForm.notes}
                      onChange={(e) => setEhrForm({ ...ehrForm, notes: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      rows="3"
                      placeholder="Additional notes and observations"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSaveEHR}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Save & Complete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Stethoscope className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a patient from the queue to begin consultation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Admin View
  const AdminView = () => {
    const totalPatients = patients.length;
    const completedToday = patients.filter(p => p.status === 'completed').length;
    const avgWaitTime = '23 min';
    const revenue = '$12,450';

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard - Billing & Analytics</h2>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{totalPatients}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from yesterday
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-800">{completedToday}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {totalPatients - completedToday} in queue
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-3xl font-bold text-gray-800">{avgWaitTime}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500 opacity-20" />
            </div>
            <div className="mt-2 text-sm text-green-600">
              -5 min improvement
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Revenue</p>
                <p className="text-3xl font-bold text-gray-800">{revenue}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from yesterday
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Department Distribution</h3>
            <div className="space-y-3">
              {['General', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology'].map((dept, idx) => {
                const count = patients.filter(p => p.department === dept).length;
                const percentage = totalPatients > 0 ? (count / totalPatients * 100) : 0;
                return (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{dept}</span>
                      <span className="font-semibold">{count} patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Billing</h3>
            <div className="space-y-3">
              {patients.filter(p => p.status === 'completed').map(patient => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-600">{patient.department}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">${Math.floor(Math.random() * 500 + 100)}</div>
                    <div className="text-xs text-gray-500">Paid</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Layout with Sidebar
  const MainLayout = () => (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${currentUser?.color} rounded-full flex items-center justify-center`}>
              {currentUser && <currentUser.icon className="w-6 h-6 text-white" />}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{currentUser?.name}</div>
              <div className="text-xs text-gray-500">Hospital Staff</div>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {currentUser?.id === 'receptionist' && (
              <button
                onClick={() => setCurrentView('receptionist')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'receptionist' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserCheck className="w-5 h-5" />
                <span>Patient Registration</span>
              </button>
            )}
            {currentUser?.id === 'doctor' && (
              <button
                onClick={() => setCurrentView('doctor')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'doctor' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Stethoscope className="w-5 h-5" />
                <span>Consultation</span>
              </button>
            )}
            {currentUser?.id === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'admin' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-5 h-5" />
                <span>Analytics & Billing</span>
              </button>
            )}
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {currentView === 'receptionist' && <ReceptionistView />}
        {currentView === 'doctor' && <DoctorView />}
        {currentView === 'admin' && <AdminView />}
      </div>
    </div>
  );

  return currentView === 'login' ? <LoginView /> : <MainLayout />;
};

export default HospitalInfoSystem;