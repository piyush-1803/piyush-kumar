import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings, Dumbbell, Award, Image, BookOpen, Mail, Save, Plus, Trash2, Edit2, CheckCircle2, AlertTriangle, ArrowLeft, RefreshCw, Eye, User
} from 'lucide-react';
import { GymWebsiteData, GymDetails, AboutSection, MembershipPlan, Trainer, GalleryItem, BlogPost, ContactSubmission, SEOSettings, GymService, Facility } from '../types';

interface AdminDashboardProps {
  data: GymWebsiteData;
  onSave: (newData: GymWebsiteData) => Promise<boolean>;
  onClose: () => void;
}

type AdminTab = 'submissions' | 'general' | 'plans' | 'trainers' | 'gallery' | 'blogs' | 'services_facilities';

export default function AdminDashboard({ data, onSave, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('submissions');
  const [currentData, setCurrentData] = useState<GymWebsiteData>(JSON.parse(JSON.stringify(data)));
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleFieldChange = (section: keyof GymWebsiteData, field: string, value: any) => {
    setCurrentData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const triggerSave = async (newDataState = currentData) => {
    setSaveStatus('saving');
    try {
      const res = await onSave(newDataState);
      if (res) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  // --- Submissions Management ---
  const markSubmissionStatus = async (id: string, newStatus: 'read' | 'resolved') => {
    const updatedSubmissions = currentData.submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    const updatedData = { ...currentData, submissions: updatedSubmissions };
    setCurrentData(updatedData);
    await triggerSave(updatedData);
  };

  const deleteSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission history?')) return;
    const updatedSubmissions = currentData.submissions.filter(sub => sub.id !== id);
    const updatedData = { ...currentData, submissions: updatedSubmissions };
    setCurrentData(updatedData);
    await triggerSave(updatedData);
  };

  // --- Plans Management ---
  const handlePlanEdit = (idx: number, field: keyof MembershipPlan, value: any) => {
    const updatedPlans = [...currentData.plans];
    updatedPlans[idx] = { ...updatedPlans[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, plans: updatedPlans }));
  };

  const handlePlanFeaturesChange = (idx: number, featureIdx: number, value: string) => {
    const updatedPlans = [...currentData.plans];
    const features = [...updatedPlans[idx].features];
    features[featureIdx] = value;
    updatedPlans[idx].features = features;
    setCurrentData(prev => ({ ...prev, plans: updatedPlans }));
  };

  const addFeatureToPlan = (idx: number) => {
    const updatedPlans = [...currentData.plans];
    updatedPlans[idx].features.push('New Feature Benefit');
    setCurrentData(prev => ({ ...prev, plans: updatedPlans }));
  };

  const removeFeatureFromPlan = (idx: number, featureIdx: number) => {
    const updatedPlans = [...currentData.plans];
    updatedPlans[idx].features.splice(featureIdx, 1);
    setCurrentData(prev => ({ ...prev, plans: updatedPlans }));
  };

  const addNewPlan = () => {
    const newPlan: MembershipPlan = {
      id: `plan-${Date.now()}`,
      name: 'New Custom Package',
      price: '₹1,000',
      billingPeriod: 'Month',
      features: ['Access during floor slots', 'RO Drinking water access'],
      isPopular: false
    };
    setCurrentData(prev => ({ ...prev, plans: [...prev.plans, newPlan] }));
  };

  const deletePlan = (id: string) => {
    if (!window.confirm('Delete this plan card?')) return;
    setCurrentData(prev => ({ ...prev, plans: prev.plans.filter(p => p.id !== id) }));
  };

  // --- Trainers Management ---
  const handleTrainerEdit = (idx: number, field: keyof Trainer, value: any) => {
    const updated = [...currentData.trainers];
    updated[idx] = { ...updated[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, trainers: updated }));
  };

  const addNewTrainer = () => {
    const newTrainer: Trainer = {
      id: `trainer-${Date.now()}`,
      name: 'New Coach Name',
      role: 'Floor Fitness Instructor',
      experience: '2 Years',
      specialties: ['General Fitness', 'Weight Loss'],
      certifications: ['CPR Certified'],
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400'
    };
    setCurrentData(prev => ({ ...prev, trainers: [...prev.trainers, newTrainer] }));
  };

  const deleteTrainer = (id: string) => {
    if (!window.confirm('Delete this trainer profile?')) return;
    setCurrentData(prev => ({ ...prev, trainers: prev.trainers.filter(t => t.id !== id) }));
  };

  // --- Gallery Management ---
  const handleGalleryEdit = (idx: number, field: keyof GalleryItem, value: any) => {
    const updated = [...currentData.gallery];
    updated[idx] = { ...updated[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, gallery: updated }));
  };

  const addNewGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
      category: 'equipment',
      title: 'Advanced Machine Row'
    };
    setCurrentData(prev => ({ ...prev, gallery: [newItem, ...prev.gallery] }));
  };

  const deleteGalleryItem = (id: string) => {
    setCurrentData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
  };

  // --- Blogs Management ---
  const handleBlogEdit = (idx: number, field: keyof BlogPost, value: any) => {
    const updated = [...currentData.blogs];
    updated[idx] = { ...updated[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, blogs: updated }));
  };

  const addNewBlog = () => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: 'Starting Out: Tips for Gym Beginners',
      summary: 'Starting a fitness routine is tough. Here is the ultimate starting roadmap.',
      content: 'Starting physical conditioning is one of the best life choices you will ever make. Focus on form, consistency, hydration, and progressive overload. Eat wholesome Indian foods like chickpeas, double toned milk, and eggs!',
      date: new Date().toISOString().split('T')[0],
      readTime: '3 mins read',
      author: 'Coach Vikash Kumar',
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=600',
      category: 'Training'
    };
    setCurrentData(prev => ({ ...prev, blogs: [newBlog, ...prev.blogs] }));
  };

  const deleteBlog = (id: string) => {
    if (!window.confirm('Delete this article post?')) return;
    setCurrentData(prev => ({ ...prev, blogs: prev.blogs.filter(b => b.id !== id) }));
  };

  // --- Services / Facilities Management ---
  const handleServiceEdit = (idx: number, field: keyof GymService, value: any) => {
    const updated = [...currentData.services];
    updated[idx] = { ...updated[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, services: updated }));
  };

  const handleFacilityEdit = (idx: number, field: keyof Facility, value: any) => {
    const updated = [...currentData.facilities];
    updated[idx] = { ...updated[idx], [field]: value };
    setCurrentData(prev => ({ ...prev, facilities: updated }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col pt-20">
      
      {/* Admin Title Banner */}
      <div className="bg-black border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Back button and name */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="bg-black border border-white/10 p-2 rounded-none text-zinc-400 hover:text-white hover:border-red-600/30 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <span className="text-xs font-black text-red-500 uppercase tracking-widest font-mono">Control Panel</span>
              <h1 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                NATIONAL GYM OWNER ADMIN
              </h1>
            </div>
          </div>

          {/* Quick status message and Save indicator */}
          <div className="flex items-center space-x-3 self-stretch sm:self-auto">
            {saveStatus === 'saving' && (
              <span className="flex items-center text-xs text-amber-400 font-sans font-bold uppercase tracking-wider space-x-1">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Syncing Database...</span>
              </span>
            )}
            {saveStatus === 'success' && (
              <span className="flex items-center text-xs text-green-400 font-sans font-bold uppercase tracking-wider space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Saved successfully!</span>
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center text-xs text-red-500 font-sans font-bold uppercase tracking-wider space-x-1">
                <AlertTriangle className="h-3.5 w-3.5 animate-bounce" />
                <span>Failure saving!</span>
              </span>
            )}

            <button
              onClick={() => triggerSave()}
              className="bg-red-600 hover:bg-red-700 font-sans font-bold text-white px-5 py-2.5 rounded-none transition-all shadow-none flex items-center space-x-2 text-xs uppercase tracking-widest cursor-pointer"
            >
              <Save className="h-4.5 w-4.5" />
              <span>COMMIT CHANGES</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Panel Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation panel */}
        <div className="lg:col-span-3 bg-black border border-white/10 p-4 rounded-none space-y-1.5 self-start">
          <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-3 px-3">
            Dashboard Modules
          </span>

          {/* Submissions button (has badges) */}
          <button
            onClick={() => setActiveTab('submissions')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <span className="flex items-center space-x-2.5">
              <Mail className="h-4 w-4" />
              <span>User Inquiries</span>
            </span>
            {currentData.submissions.filter(s => s.status === 'unread').length > 0 && (
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-none ${
                activeTab === 'submissions' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
              }`}>
                {currentData.submissions.filter(s => s.status === 'unread').length}
              </span>
            )}
          </button>

          {/* General settings button */}
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'general'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>General & SEO Settings</span>
          </button>

          {/* Services & Facilities button */}
          <button
            onClick={() => setActiveTab('services_facilities')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'services_facilities'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Dumbbell className="h-4 w-4" />
            <span>Services & Facilities</span>
          </button>

          {/* Plans settings button */}
          <button
            onClick={() => setActiveTab('plans')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Pricing plans</span>
          </button>

          {/* Trainers settings button */}
          <button
            onClick={() => setActiveTab('trainers')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'trainers'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Coaching Staff</span>
          </button>

          {/* Gallery settings button */}
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Image className="h-4 w-4" />
            <span>Gallery photos</span>
          </button>

          {/* Blogs settings button */}
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-3.5 py-3 rounded-none font-display text-xs font-black uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
              activeTab === 'blogs'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Fitness Publications</span>
          </button>
        </div>

        {/* Action Panel Content Column */}
        <div className="lg:col-span-9 bg-black border border-white/10 rounded-none p-6 min-h-[60vh]">
          
          {/* TABS CONTROLLERS */}

          {/* 1. SUBMISSIONS TAB */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">User Recruitment Inquiries</h2>
                  <p className="text-xs text-zinc-400 mt-1">Form feedback messages submitted by visitors on the gym website.</p>
                </div>
              </div>

              {currentData.submissions.length === 0 ? (
                <div className="text-center py-16 bg-zinc-950/50 rounded-xl border border-zinc-900">
                  <Mail className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-500 font-sans text-sm">No contact submissions received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentData.submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-5 rounded-xl border bg-zinc-950 ${
                        sub.status === 'unread' ? 'border-gym-red/40' : 'border-zinc-850'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-4">
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="font-display font-black text-base text-white">{sub.name}</span>
                            {sub.status === 'unread' && (
                              <span className="bg-gym-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">NEW</span>
                            )}
                            {sub.status === 'resolved' && (
                              <span className="bg-green-500/10 text-green-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-green-500/20">RESOLVED</span>
                            )}
                          </div>
                          
                          {/* Contacts details */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 font-sans mt-1">
                            <span>Phone: <a href={`tel:${sub.phone}`} className="text-zinc-300 font-bold hover:underline">{sub.phone}</a></span>
                            {sub.email && <span>Email: <span className="text-zinc-300">{sub.email}</span></span>}
                            <span>Date: <span className="text-zinc-300">{sub.date}</span></span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 text-xs">
                          {sub.status === 'unread' && (
                            <button
                              onClick={() => markSubmissionStatus(sub.id, 'read')}
                              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg font-bold"
                            >
                              Mark Read
                            </button>
                          )}
                          {sub.status !== 'resolved' && (
                            <button
                              onClick={() => markSubmissionStatus(sub.id, 'resolved')}
                              className="bg-green-500/15 border border-green-500/35 hover:bg-green-500/25 text-green-400 px-3 py-1.5 rounded-lg font-bold"
                            >
                              Mark Resolved
                            </button>
                          )}
                          <button
                            onClick={() => deleteSubmission(sub.id)}
                            className="bg-zinc-900 hover:bg-rose-950 hover:text-gym-red border border-zinc-800 p-1.5 rounded-lg"
                            title="Delete submission record"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content block */}
                      <p className="bg-zinc-900/60 p-4 rounded-lg font-sans text-xs md:text-sm text-zinc-300 italic whitespace-pre-wrap leading-relaxed border border-zinc-900">
                        "{sub.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-850">
                <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">General & SEO Information</h2>
                <p className="text-xs text-zinc-400 mt-1">Control your brand name, address coordinates, timings and search tags.</p>
              </div>

              {/* Gym Details Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Gym Display Name</label>
                  <input
                    type="text"
                    value={currentData.details.name}
                    onChange={(e) => handleFieldChange('details', 'name', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Bilingual Name (Hindi)</label>
                  <input
                    type="text"
                    value={currentData.details.hindiName}
                    onChange={(e) => handleFieldChange('details', 'hindiName', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Primary Contact Number</label>
                  <input
                    type="text"
                    value={currentData.details.phone}
                    onChange={(e) => handleFieldChange('details', 'phone', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Operational Timings Slogan</label>
                  <input
                    type="text"
                    value={currentData.details.hours}
                    onChange={(e) => handleFieldChange('details', 'hours', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Gym Counter Address</label>
                  <input
                    type="text"
                    value={currentData.details.address}
                    onChange={(e) => handleFieldChange('details', 'address', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Google Maps Plus Code</label>
                  <input
                    type="text"
                    value={currentData.details.mapsPlusCode}
                    onChange={(e) => handleFieldChange('details', 'mapsPlusCode', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Google Maps Embed URL</label>
                  <input
                    type="text"
                    value={currentData.details.mapsEmbedUrl}
                    onChange={(e) => handleFieldChange('details', 'mapsEmbedUrl', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>
              </div>

              {/* About Text block */}
              <div className="pt-6 border-t border-zinc-850 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">Homepage About Content</h3>
                
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">About Section Title</label>
                  <input
                    type="text"
                    value={currentData.about.title}
                    onChange={(e) => handleFieldChange('about', 'title', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Motivation Headline</label>
                    <input
                      type="text"
                      value={currentData.about.headline}
                      onChange={(e) => handleFieldChange('about', 'headline', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Mission Summary</label>
                    <input
                      type="text"
                      value={currentData.about.mission}
                      onChange={(e) => handleFieldChange('about', 'mission', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Main Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={currentData.about.description1}
                    onChange={(e) => handleFieldChange('about', 'description1', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Supportive Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={currentData.about.description2}
                    onChange={(e) => handleFieldChange('about', 'description2', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red font-sans"
                  />
                </div>
              </div>

              {/* SEO parameters block */}
              <div className="pt-6 border-t border-zinc-850 space-y-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">Search Engine Optimization (SEO)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Google Search Tab Title</label>
                    <input
                      type="text"
                      value={currentData.seo.metaTitle}
                      onChange={(e) => handleFieldChange('seo', 'metaTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">SEO keywords (comma separated)</label>
                    <input
                      type="text"
                      value={currentData.seo.keywords}
                      onChange={(e) => handleFieldChange('seo', 'keywords', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Meta Description (Snippet displayed in Google)</label>
                    <textarea
                      rows={2}
                      value={currentData.seo.metaDescription}
                      onChange={(e) => handleFieldChange('seo', 'metaDescription', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gym-red font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PLANS TAB */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">Membership Packages</h2>
                  <p className="text-xs text-zinc-400 mt-1">Add, delete, or alter pricing points and highlight standard cards.</p>
                </div>
                <button
                  onClick={addNewPlan}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-gym-red px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Plan</span>
                </button>
              </div>

              {/* Cards form stack */}
              <div className="space-y-6">
                {currentData.plans.map((plan, idx) => (
                  <div key={plan.id} className="p-5 rounded-xl border border-zinc-850 bg-zinc-950 relative space-y-4">
                    
                    {/* Header bar */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold font-mono text-zinc-500">Plan Card #{idx + 1}</span>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="text-zinc-500 hover:text-gym-red transition-colors"
                        title="Delete Plan Card"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Plan Package Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => handlePlanEdit(idx, 'name', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gym-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Pricing Label</label>
                        <input
                          type="text"
                          value={plan.price}
                          onChange={(e) => handlePlanEdit(idx, 'price', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gym-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Billing Slot</label>
                        <input
                          type="text"
                          value={plan.billingPeriod}
                          onChange={(e) => handlePlanEdit(idx, 'billingPeriod', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Checkbox popular */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`popular-${plan.id}`}
                        checked={plan.isPopular}
                        onChange={(e) => handlePlanEdit(idx, 'isPopular', e.target.checked)}
                        className="rounded border-zinc-800 text-gym-red focus:ring-gym-red"
                      />
                      <label htmlFor={`popular-${plan.id}`} className="text-xs text-zinc-300 font-sans font-semibold cursor-pointer">
                        Mark as "Most Popular Value" (Highlights card in red, centers on desktop)
                      </label>
                    </div>

                    {/* Features list edits */}
                    <div className="space-y-2 pt-2 border-t border-zinc-900">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase">Features Inclusions</span>
                        <button
                          onClick={() => addFeatureToPlan(idx)}
                          className="text-[10px] font-bold text-gym-red hover:underline flex items-center"
                        >
                          <Plus className="h-3 w-3 mr-0.5" /> Add Benefit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {plan.features.map((feature, featIdx) => (
                          <div key={featIdx} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handlePlanFeaturesChange(idx, featIdx, e.target.value)}
                              className="flex-grow bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 focus:outline-none focus:border-gym-red"
                            />
                            <button
                              onClick={() => removeFeatureFromPlan(idx, featIdx)}
                              className="text-zinc-500 hover:text-gym-red"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TRAINERS TAB */}
          {activeTab === 'trainers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">Gym Coaching Staff</h2>
                  <p className="text-xs text-zinc-400 mt-1">Manage names, roles, experience, specialties, and pictures.</p>
                </div>
                <button
                  onClick={addNewTrainer}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-gym-red px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Trainer Profile</span>
                </button>
              </div>

              {/* Trainers List */}
              <div className="space-y-6">
                {currentData.trainers.map((trainer, idx) => (
                  <div key={trainer.id} className="p-5 rounded-xl border border-zinc-850 bg-zinc-950 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold font-mono text-zinc-500">Coach Profile #{idx + 1}</span>
                      <button
                        onClick={() => deleteTrainer(trainer.id)}
                        className="text-zinc-500 hover:text-gym-red transition-colors"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Coach Name</label>
                        <input
                          type="text"
                          value={trainer.name}
                          onChange={(e) => handleTrainerEdit(idx, 'name', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Designation / Role</label>
                        <input
                          type="text"
                          value={trainer.role}
                          onChange={(e) => handleTrainerEdit(idx, 'role', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Experience Years</label>
                        <input
                          type="text"
                          value={trainer.experience}
                          onChange={(e) => handleTrainerEdit(idx, 'experience', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Coach Image URL (Supports Unsplash)</label>
                        <input
                          type="text"
                          value={trainer.image}
                          onChange={(e) => handleTrainerEdit(idx, 'image', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300"
                        />
                      </div>
                    </div>

                    {/* Specialties / Certifications lists */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-900">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Specialties (comma separated)</label>
                        <input
                          type="text"
                          value={trainer.specialties.join(', ')}
                          onChange={(e) => handleTrainerEdit(idx, 'specialties', e.target.value.split(',').map(s => s.trim()))}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1.5">Certifications (comma separated)</label>
                        <input
                          type="text"
                          value={trainer.certifications.join(', ')}
                          onChange={(e) => handleTrainerEdit(idx, 'certifications', e.target.value.split(',').map(s => s.trim()))}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">Workout Gallery Photos</h2>
                  <p className="text-xs text-zinc-400 mt-1">Upload or alter homepage images and tag their categories.</p>
                </div>
                <button
                  onClick={addNewGalleryItem}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-gym-red px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Append Photo</span>
                </button>
              </div>

              {/* Photos grid list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentData.gallery.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 space-y-3 flex flex-col justify-between">
                    <div className="aspect-video w-full overflow-hidden rounded bg-zinc-900 relative">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="absolute top-2.5 right-2.5 bg-black/80 text-gym-red border border-zinc-800/80 p-2 rounded-lg hover:bg-zinc-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-0.5">Image Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleGalleryEdit(idx, 'title', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-0.5">Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => handleGalleryEdit(idx, 'category', e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300"
                          >
                            <option value="equipment">equipment (Machines)</option>
                            <option value="cardio">cardio (Cardio Zone)</option>
                            <option value="workout">workout (Athletes)</option>
                            <option value="general">general (Interiors)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-0.5">Image URL</label>
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => handleGalleryEdit(idx, 'url', e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
                <div>
                  <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">Fitness Publications</h2>
                  <p className="text-xs text-zinc-400 mt-1">Draft, publish, and delete healthy lifestyle articles.</p>
                </div>
                <button
                  onClick={addNewBlog}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-gym-red px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Draft Article</span>
                </button>
              </div>

              {/* Blogs items stack */}
              <div className="space-y-6">
                {currentData.blogs.map((post, idx) => (
                  <div key={post.id} className="p-5 rounded-xl border border-zinc-850 bg-zinc-950 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold font-mono text-zinc-500">Draft #{idx + 1}</span>
                      <button
                        onClick={() => deleteBlog(post.id)}
                        className="text-zinc-500 hover:text-gym-red"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Article Title</label>
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => handleBlogEdit(idx, 'title', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Category / Tag</label>
                        <input
                          type="text"
                          value={post.category}
                          onChange={(e) => handleBlogEdit(idx, 'category', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Publishing Date</label>
                        <input
                          type="text"
                          value={post.date}
                          onChange={(e) => handleBlogEdit(idx, 'date', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Reading Duration</label>
                        <input
                          type="text"
                          value={post.readTime}
                          onChange={(e) => handleBlogEdit(idx, 'readTime', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Author Name</label>
                        <input
                          type="text"
                          value={post.author}
                          onChange={(e) => handleBlogEdit(idx, 'author', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Banner Image URL</label>
                        <input
                          type="text"
                          value={post.image}
                          onChange={(e) => handleBlogEdit(idx, 'image', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Brief Summary Sentence</label>
                        <input
                          type="text"
                          value={post.summary}
                          onChange={(e) => handleBlogEdit(idx, 'summary', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Full Article Contents</label>
                        <textarea
                          rows={6}
                          value={post.content}
                          onChange={(e) => handleBlogEdit(idx, 'content', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 font-sans leading-normal"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. SERVICES & FACILITIES TAB */}
          {activeTab === 'services_facilities' && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-zinc-850">
                <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">Services & Facilities Manager</h2>
                <p className="text-xs text-zinc-400 mt-1">Configure individual workout systems and building conveniences directly.</p>
              </div>

              {/* Services Subsection */}
              <div className="space-y-6">
                <h3 className="font-display font-bold text-base text-gym-red uppercase tracking-wide">Workout Specialties</h3>
                <div className="grid grid-cols-1 gap-4">
                  {currentData.services.map((serv, idx) => (
                    <div key={serv.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                      <div className="aspect-video bg-zinc-900 rounded overflow-hidden">
                        <img src={serv.image} alt={serv.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="sm:col-span-3 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={serv.title}
                            onChange={(e) => handleServiceEdit(idx, 'title', e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white font-bold"
                            placeholder="Title"
                          />
                          <input
                            type="text"
                            value={serv.image}
                            onChange={(e) => handleServiceEdit(idx, 'image', e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-[10px] text-zinc-400"
                            placeholder="Image URL"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={serv.description}
                          onChange={(e) => handleServiceEdit(idx, 'description', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 font-sans resize-none"
                          placeholder="Description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities Subsection */}
              <div className="space-y-6 pt-6 border-t border-zinc-850">
                <h3 className="font-display font-bold text-base text-gym-red uppercase tracking-wide">Amenities & Conveniences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentData.facilities.map((fac, idx) => (
                    <div key={fac.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 space-y-2">
                      <input
                        type="text"
                        value={fac.title}
                        onChange={(e) => handleFacilityEdit(idx, 'title', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white font-bold"
                      />
                      <textarea
                        rows={2}
                        value={fac.description}
                        onChange={(e) => handleFacilityEdit(idx, 'description', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-400 font-sans resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
