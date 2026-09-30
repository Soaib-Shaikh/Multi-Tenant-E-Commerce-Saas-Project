import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Check, Save, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('personal');

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Address State
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  const handleSavePersonal = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    showToast('Profile updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      type: 'Other',
      isDefault: addresses.length === 0,
      street: newStreet,
      city: newCity,
      state: 'CA',
      zip: '94100',
      country: 'United States'
    };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    updateProfile({ addresses: updated });
    setNewStreet('');
    setNewCity('');
    showToast('New shipping address added!');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
          alt={user?.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
        />
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-black">{user?.name || 'Customer Account'}</h1>
          <p className="text-xs text-indigo-300 font-mono">{user?.email}</p>
          <span className="inline-block bg-white/10 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 mt-1">
            VIP Member
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('personal')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'personal' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" /> Personal Information
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'addresses' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4" /> Shipping Addresses ({addresses.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition-colors ${
              activeTab === 'security' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" /> Security & Password
          </button>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          
          {/* Tab 1: Personal Info */}
          {activeTab === 'personal' && (
            <form onSubmit={handleSavePersonal} className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </form>
          )}

          {/* Tab 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Saved Shipping Addresses
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative">
                    {addr.isDefault && (
                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-3 right-3">
                        DEFAULT
                      </span>
                    )}
                    <p className="text-xs font-bold text-slate-800">{addr.type} Address</p>
                    <p className="text-xs text-slate-600">{addr.street}</p>
                    <p className="text-xs text-slate-500">{addr.city}, {addr.state} {addr.zip}</p>
                  </div>
                ))}
              </div>

              {/* Add New Address Form */}
              <form onSubmit={handleAddAddress} className="bg-slate-50 p-4 rounded-2xl space-y-3 pt-4 border border-dashed border-slate-300">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" /> Add New Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Security & Password Settings
              </h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs" />
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Password updated successfully!')}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
