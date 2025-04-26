"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, FilterX, ChevronDown, ChevronUp, Search } from "lucide-react";

export default function UserManagement() {
  // State for users and filters
  interface User {
    id: string;
    name: string;
    email: string;
    userType: string;
    company: string;
    joinDate: string;
    status: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Filter states
  const [userType, setUserType] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [joinDateRange, setJoinDateRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for demonstration
  const mockUsers = [
    {
      id: "01",
      name: "John Doe",
      email: "john.doe@example.com",
      userType: "supplier",
      company: "Acme Corp",
      joinDate: "15-Jan-2023",
      status: "active"
    },
    {
      id: "02",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      userType: "buyer",
      company: "XYZ Manufacturing",
      joinDate: "22-Feb-2023",
      status: "active"
    },
    {
      id: "03",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      userType: "admin",
      company: "The Supplier",
      joinDate: "10-Mar-2023",
      status: "inactive"
    },
    {
      id: "04",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      userType: "supplier",
      company: "Tech Industries",
      joinDate: "05-Apr-2023",
      status: "active"
    },
    {
      id: "05",
      name: "Carol Wilson",
      email: "carol.wilson@example.com",
      userType: "buyer",
      company: "Wilson Manufacturing",
      joinDate: "18-May-2023",
      status: "active"
    }
  ];

  // Fetch users on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 800);
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    let results = users;
    
    if (userType) {
      results = results.filter(user => user.userType.toLowerCase() === userType.toLowerCase());
    }
    
    if (userStatus) {
      results = results.filter(user => user.status.toLowerCase() === userStatus.toLowerCase());
    }
    
    if (joinDateRange) {
      // In a real app, implement date filtering logic here
    }
    
    if (searchTerm) {
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortField) {
      results = [...results].sort((a, b) => {
        const aValue = (a[sortField!] as string)?.toLowerCase() || "";
        const bValue = (b[sortField!] as string)?.toLowerCase() || "";
        
        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    setFilteredUsers(results);
  }, [users, userType, userStatus, joinDateRange, searchTerm, sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setUserType("");
    setUserStatus("");
    setJoinDateRange("");
    setSearchTerm("");
  };

  // Edit user
  const handleEditUser = (id: string) => {
    // In a real app, this would navigate to an edit form
    alert(`Edit user with ID: ${id}`);
  };

  // Delete user
  const handleDeleteUser = (id:string) => {
    // In a real app, this would call an API endpoint
    if (confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  };

  // Render user type badge based on type
  const renderUserTypeBadge = (type: string) => {
    switch(type.toLowerCase()) {
      case 'supplier':
        return (
          <div className="w-24 h-7 px-4 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-teal-500 rounded"></div>
            <div className="text-teal-500 text-xs font-bold">Supplier</div>
          </div>
        );
      case 'buyer':
        return (
          <div className="w-24 h-7 px-7 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-violet-700 rounded"></div>
            <div className="text-violet-700 text-xs font-bold">Buyer</div>
          </div>
        );
      case 'admin':
        return (
          <div className="w-24 h-7 px-7 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-red-600 rounded"></div>
            <div className="text-red-600 text-xs font-bold">Admin</div>
          </div>
        );
      default:
        return <div>{type}</div>;
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return (
          <div className="w-24 h-7 px-4 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-teal-500 rounded"></div>
            <div className="text-teal-500 text-xs font-bold">Active</div>
          </div>
        );
      case 'inactive':
        return (
          <div className="w-24 h-7 px-7 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-red-600 rounded"></div>
            <div className="text-red-600 text-xs font-bold">Inactive</div>
          </div>
        );
      default:
        return <div>{status}</div>;
    }
  };

  return (
    <div className="self-stretch px-5 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2.5 overflow-hidden">
        <h1 className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans']">User Management</h1>
      </div>

      {/* Filters */}
      <div className="w-full bg-gray-50 rounded-[10px] border-[0.60px] border-neutral-300 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* User Type filter */}
          <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
            >
              <option value="">Select User Type</option>
              <option value="supplier">Supplier</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Status filter */}
          <div className="relative">
            <select
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Join Date filter */}
          <div className="relative">
            <input
              type="date"
              value={joinDateRange}
              onChange={(e) => setJoinDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Reset Filters */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={resetFilters}>
        <FilterX size={16} className="text-rose-600" />
        <span className="text-rose-600 text-sm font-semibold">Reset Filter</span>
      </div>
      
      {/* Filter Labels (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-bold text-neutral-800">
        <div>User Type</div>
        <div>Status</div>
        <div>Date</div>
        <div>Filter By</div>
      </div>
      
      {/* Divider */}
      <div className="h-px opacity-60 bg-black/60"></div>
      
      {/* Results count */}
      <div className="flex flex-col overflow-hidden">
        <div className="opacity-60 text-neutral-800 text-sm font-semibold">
          Showing 1-{filteredUsers.length < 5 ? filteredUsers.length : '05'}
        </div>
      </div>
      
      {/* Users Table */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm">
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {[
                    { id: "id", label: "ID", sortable: true },
                    { id: "name", label: "NAME", sortable: true },
                    { id: "email", label: "EMAIL", sortable: true },
                    { id: "userType", label: "USER TYPE", sortable: true },
                    { id: "company", label: "COMPANY", sortable: true },
                    { id: "joinDate", label: "JOIN DATE", sortable: true },
                    { id: "status", label: "STATUS", sortable: true },
                    { id: "actions", label: "ACTION", sortable: false }
                  ].map(column => (
                    <th 
                      key={column.id} 
                      className={`px-8 py-5 text-left text-sm font-extrabold text-black/90 uppercase ${column.sortable ? 'cursor-pointer' : ''}`}
                      onClick={() => column.sortable && handleSort(column.id as keyof User)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {column.sortable && sortField === column.id && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {user.id}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {user.name}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {user.email}
                    </td>
                    <td className="px-8 py-5">
                      {renderUserTypeBadge(user.userType)}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {user.company}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {user.joinDate}
                    </td>
                    <td className="px-8 py-5 text-center">
                      {renderStatusBadge(user.status)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => handleEditUser(user.id)}
                          className="w-24 h-7 p-2 flex items-center justify-center rounded-lg border border-indigo-500 text-indigo-500"
                        >
                          <Edit size={12} className="mr-1" />
                          <span className="text-xs font-bold">Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="w-24 h-7 p-2 flex items-center justify-center bg-red-600 rounded-lg text-white"
                        >
                          <Trash2 size={12} className="mr-1" />
                          <span className="text-xs font-bold">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}