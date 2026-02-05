import React, { useState } from 'react';
import { OUR_WORK_GALLERY, TESTIMONIALS } from '../constants';
import type { WorkItem, Testimonial } from '../types';
import { useAuth } from '../context/AuthContext';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OurWork: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Content state
  // FIX: All page-specific content state is now persisted to localStorage.
  const [pageContent, setPageContent] = useLocalStorage('the-shop-our-work-header', {
      title: "Our Work",
      description: "See the quality and craftsmanship in our recent projects."
  });
  const [gallery, setGallery] = useLocalStorage<WorkItem[]>('the-shop-our-work-gallery', OUR_WORK_GALLERY);
  const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('the-shop-our-work-testimonials', TESTIMONIALS);


  // Editing state
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null);
  const [itemBeingRemoved, setItemBeingRemoved] = useState<{type: 'work' | 'testimonial', index: number} | null>(null);
  
  // State for adding new work item
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWork, setNewWork] = useState<WorkItem>({
    before: '',
    after: '',
    title: '',
    description: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'before' | 'after', index?: number) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
              const newImage = event.target.result;
              if (index !== undefined) { // Editing existing item
                  setGallery(prev => prev.map((item, i) => i === index ? { ...item, [field]: newImage } : item));
              } else { // Adding new item
                  setNewWork(prev => ({ ...prev, [field]: newImage }));
              }
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
  };
  
  const handleAddWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWork.before && newWork.after && newWork.title && newWork.description) {
      setGallery(prev => [newWork, ...prev]);
      setNewWork({ before: '', after: '', title: '', description: '' });
      setShowAddForm(false);
      (e.target as HTMLFormElement).reset();
    } else {
      alert('Please fill out all fields and upload both images.');
    }
  };

  const handleRemoveWork = (indexToRemove: number) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
        setItemBeingRemoved({ type: 'work', index: indexToRemove });
        setTimeout(() => {
            setGallery(prev => prev.filter((_, index) => index !== indexToRemove));
            setItemBeingRemoved(null);
        }, 500); // Duration of the animation
    }
  };
  
  const handleRemoveTestimonial = (indexToRemove: number) => {
    if (window.confirm('Are you sure you want to remove this testimonial?')) {
        setItemBeingRemoved({ type: 'testimonial', index: indexToRemove });
        setTimeout(() => {
            setTestimonials(prev => prev.filter((_, index) => index !== indexToRemove));
            setItemBeingRemoved(null);
        }, 500); // Duration of the animation
    }
  };


  return (
    <div className="bg-brand-dark">
      {isLoggedIn && (
         <div className="bg-yellow-500 text-black text-center py-2 sticky top-[68px] z-40">
            <strong>Admin Mode:</strong> You are currently editing the Our Work page.
         </div>
      )}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
            {isEditingHeader ? (
                <div className="max-w-3xl mx-auto space-y-4">
                    <input type="text" value={pageContent.title} onChange={(e) => setPageContent(p => ({...p, title: e.target.value}))} className="text-4xl md:text-5xl text-text-heading bg-brand-gray w-full text-center p-2 rounded" />
                    <textarea value={pageContent.description} onChange={(e) => setPageContent(p => ({...p, description: e.target.value}))} className="text-text-muted text-lg bg-brand-gray w-full p-2 rounded" />
                    <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                    <button onClick={() => setIsEditingHeader(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Save</button>
                </div>
            ) : (
                <>
                    <h1 className="text-4xl md:text-5xl text-text-heading"><MarkdownRenderer text={pageContent.title} /></h1>
                    <p className="text-text-muted mt-4 text-lg"><MarkdownRenderer text={pageContent.description} /></p>
                    {isLoggedIn && <button onClick={() => setIsEditingHeader(true)} className="mt-4 text-sm bg-brand-blue hover:brightness-110 text-white font-bold py-1 px-3 rounded-md transition duration-300">Edit Header</button>}
                </>
            )}
        </div>

        {/* Admin: Add New Work Section */}
        {isLoggedIn && (
            <div className="mb-12 text-center">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-brand-blue hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
                >
                    {showAddForm ? 'Cancel' : 'Add New Work Example'}
                </button>
            </div>
        )}

        {/* Add New Work Form */}
        {isLoggedIn && showAddForm && (
            <div className="bg-brand-gray p-8 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-text-heading mb-6 text-center">Add a Before & After Showcase</h2>
                <form onSubmit={handleAddWorkSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="before-image" className="block text-sm font-medium text-text-body mb-1">Before Image</label>
                            <input type="file" name="before-image" id="before-image" required accept="image/*"
                                className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light-gray file:text-white hover:file:bg-brand-dark"
                                onChange={(e) => handleFileChange(e, 'before')} />
                            {newWork.before && <img src={newWork.before} alt="Before preview" className="mt-4 rounded-lg h-32 w-full object-cover"/>}
                        </div>
                        <div>
                            <label htmlFor="after-image" className="block text-sm font-medium text-text-body mb-1">After Image</label>
                            <input type="file" name="after-image" id="after-image" required accept="image/*"
                                className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light-gray file:text-white hover:file:bg-brand-dark"
                                onChange={(e) => handleFileChange(e, 'after')} />
                            {newWork.after && <img src={newWork.after} alt="After preview" className="mt-4 rounded-lg h-32 w-full object-cover"/>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-body">Title</label>
                        <input type="text" name="title" id="title" required
                            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-heading focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                            value={newWork.title} onChange={(e) => setNewWork(p => ({...p, title: e.target.value}))} />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-body">Description</label>
                        <textarea name="description" id="description" rows={3} required
                            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                            value={newWork.description} onChange={(e) => setNewWork(p => ({...p, description: e.target.value}))}></textarea>
                         <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                            Add Work
                        </button>
                    </div>
                </form>
            </div>
        )}

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item, index) => (
            <div 
                key={index} 
                className={`group bg-brand-gray rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-500 ease-in-out transform border border-transparent hover:border-brand-blue hover:-translate-y-2 ${
                    itemBeingRemoved?.type === 'work' && itemBeingRemoved.index === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
            >
              <div className="relative">
                <img src={item.before} alt={`Before - ${item.title}`} className="w-full h-56 object-cover transition-opacity duration-500 group-hover:opacity-0" />
                <img src={item.after} alt={`After - ${item.title}`} className="w-full h-56 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                 <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full transition-opacity duration-500 group-hover:opacity-0 z-10">BEFORE</div>
                 <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10">AFTER</div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                {editingWorkIndex === index ? (
                    <div className="space-y-4 flex-grow flex flex-col">
                        <div>
                            <label htmlFor={`title-${index}`} className="block text-sm font-medium text-text-body">Title</label>
                            <input id={`title-${index}`} value={item.title} onChange={e => setGallery(g => g.map((w, i) => i === index ? {...w, title: e.target.value} : w))} className="text-xl font-semibold text-text-heading bg-brand-light-gray p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <label htmlFor={`desc-${index}`} className="block text-sm font-medium text-text-body">Description</label>
                            <textarea id={`desc-${index}`} value={item.description} onChange={e => setGallery(g => g.map((w, i) => i === index ? {...w, description: e.target.value} : w))} className="text-text-muted mt-1 flex-grow bg-brand-light-gray p-2 rounded w-full" rows={3} />
                            <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-text-body mb-2 text-center">Before Image</label>
                                <img src={item.before} alt="Before preview" className="rounded-lg h-24 w-full object-cover mb-2"/>
                                <label className="w-full block text-center bg-brand-light-gray hover:bg-brand-dark text-white font-bold py-2 px-3 rounded-md cursor-pointer transition-colors duration-300">
                                    Replace Picture
                                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'before', index)} />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-body mb-2 text-center">After Image</label>
                                <img src={item.after} alt="After preview" className="rounded-lg h-24 w-full object-cover mb-2"/>
                                <label className="w-full block text-center bg-brand-light-gray hover:bg-brand-dark text-white font-bold py-2 px-3 rounded-md cursor-pointer transition-colors duration-300">
                                    Replace Picture
                                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'after', index)} />
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-text-heading"><MarkdownRenderer text={item.title} /></h3>
                        <p className="text-text-muted mt-2 flex-grow"><MarkdownRenderer text={item.description} /></p>
                    </div>
                )}
                 {isLoggedIn && (
                    <div className="mt-4 flex space-x-2 self-start">
                        <button
                            onClick={() => setEditingWorkIndex(editingWorkIndex === index ? null : index)}
                            className="bg-brand-blue hover:brightness-110 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                            >
                            {editingWorkIndex === index ? 'Save' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleRemoveWork(index)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        >
                          Remove
                        </button>
                    </div>
                 )}
              </div>
            </div>
          ))}
        </div>
        {gallery.length === 0 && (
            <div className="text-center py-16 text-text-muted">
                <h3 className="text-2xl">The gallery is empty.</h3>
                {isLoggedIn && <p>Click "Add New Work Example" to add some items.</p>}
            </div>
        )}

        {/* Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-text-heading">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-brand-gray p-8 rounded-lg shadow-lg flex flex-col transition-all duration-500 ease-in-out transform border border-transparent hover:border-brand-blue hover:-translate-y-2 ${
                    itemBeingRemoved?.type === 'testimonial' && itemBeingRemoved.index === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
              >
                <svg className="w-10 h-10 text-brand-blue mb-4" fill="currentColor" viewBox="0 0 32 32"><path d="M9.984 22.484c0 1.953-0.563 3.875-1.688 5.75C6.984 30.297 5.141 31.422 3 32l-3-3.672c1.766-1.078 3-2.5 3.703-4.281 0.719-1.781 1.078-3.563 1.078-5.344v-9.188h5.188v9.188zM25.172 22.484c0 1.953-0.563 3.875-1.688 5.75-1.313 1.938-3.156 3.063-5.344 3.75l-3-3.672c1.766-1.078 3-2.5 3.703-4.281 0.719-1.781 1.078-3.563 1.078-5.344v-9.188h5.188v9.188z"/></svg>
                {editingTestimonialIndex === index ? (
                     <div>
                        <textarea value={testimonial.quote} onChange={e => setTestimonials(t => t.map((item, i) => i === index ? {...item, quote: e.target.value} : item))} className="text-text-body italic flex-grow bg-brand-light-gray p-2 rounded w-full" rows={4} />
                        <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                     </div>
                ) : (
                    <p className="text-text-body italic flex-grow">"<MarkdownRenderer text={testimonial.quote} />"</p>
                )}
                <div className="mt-4 pt-4 border-t border-brand-light-gray">
                   {editingTestimonialIndex === index ? (
                       <div className="space-y-2">
                            <input value={testimonial.author} onChange={e => setTestimonials(t => t.map((item, i) => i === index ? {...item, author: e.target.value} : item))} className="font-bold text-text-heading bg-brand-light-gray p-2 rounded w-full" />
                            <input value={testimonial.vehicle} onChange={e => setTestimonials(t => t.map((item, i) => i === index ? {...item, vehicle: e.target.value} : item))} className="text-sm text-text-muted bg-brand-light-gray p-2 rounded w-full" />
                       </div>
                   ) : (
                       <>
                            <p className="font-bold text-text-heading"><MarkdownRenderer text={testimonial.author} /></p>
                            <p className="text-sm text-text-muted"><MarkdownRenderer text={testimonial.vehicle} /></p>
                       </>
                   )}
                </div>
                {isLoggedIn && (
                     <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => setEditingTestimonialIndex(editingTestimonialIndex === index ? null : index)}
                            className="bg-brand-blue hover:brightness-110 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                            >
                            {editingTestimonialIndex === index ? 'Save' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleRemoveTestimonial(index)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        >
                          Remove
                        </button>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurWork;