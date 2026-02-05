import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MarkdownRenderer from '../components/MarkdownRenderer';
import AdminToolbar from '../components/AdminToolbar';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SEO from '../components/SEO';

const AboutUs: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [isEditingStory, setIsEditingStory] = useState(false);
    const [storyContent, setStoryContent] = useLocalStorage('the-shop-about-us-story', {
        ourStory: "Founded from a deep passion for cars and a commitment to quality, The Shop Autobody is a family-founded business built on over 50 years of experience in the automotive industry. Starting overseas, our journey brought us to the Lower Mainland, where we continue to deliver exceptional craftsmanship and personalized service. As a family-run shop, we take pride in treating every vehicle as if it were our own. Our mission is simple — to perfect everything we do and ensure every customer drives away completely satisfied.",
        ourMission: "We are dedicated to quality, honesty, and customer satisfaction — ensuring every vehicle we touch reflects our passion and pride.",
        imageUrl: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761024314/A_warm_professional_scene_inside_an_auto_body_shop_where_a_family_team_works_together_on_a_car._The_shop_is_clean_and_well-lit_with_tools_and_equipment_neatly_organized._A_father_and_son_are_polishing_a_fresh_1_pwzbwb.jpg"
    });

    const handleStoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    setStoryContent(s => ({ ...s, imageUrl: event.target.result as string }));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="bg-brand-dark">
            <SEO
                title="About Us - Trusted Autobody Shop in Burnaby BC"
                description="Family-owned and operated for over 50 years. The Shop Autobody is Burnaby's trusted choice for quality collision repair and exceptional service."
            />
            {isLoggedIn && (
                <div className="bg-yellow-500 text-black text-center py-2 sticky top-[68px] z-40">
                    <strong>Admin Mode:</strong> You are currently editing the About Us page.
                </div>
            )}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl tracking-tight text-text-heading">
                        About The Shop Autobody
                    </h1>
                    <p className="text-text-muted mt-4 text-lg max-w-3xl mx-auto">Learn about our passion for automotive excellence and our commitment to our customers.</p>
                </div>

                {/* Story & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 md:order-1 relative group">
                        {isEditingStory ? (
                            <div className="bg-brand-gray p-4 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-body mb-1">Our Story</label>
                                    <textarea value={storyContent.ourStory} onChange={e => setStoryContent(s => ({ ...s, ourStory: e.target.value }))} className="w-full bg-brand-light-gray p-2 rounded text-text-body" rows={8} />
                                    <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-body mb-1">Our Mission</label>
                                    <textarea value={storyContent.ourMission} onChange={e => setStoryContent(s => ({ ...s, ourMission: e.target.value }))} className="w-full bg-brand-light-gray p-2 rounded text-text-body" rows={3} />
                                    <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                                </div>
                                <button onClick={() => setIsEditingStory(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Save</button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl text-text-heading mb-4">Our Story</h2>
                                <p className="text-text-body mb-4 leading-relaxed"><MarkdownRenderer text={storyContent.ourStory} /></p>
                                <div className="bg-brand-gray border-l-4 border-brand-blue p-6 rounded-r-lg mt-6">
                                    <h3 className="text-xl font-semibold text-text-heading mb-2">Our Mission</h3>
                                    <p className="text-lg italic text-text-body">“<MarkdownRenderer text={storyContent.ourMission} />”</p>
                                </div>
                            </>
                        )}
                        {isLoggedIn && !isEditingStory && <AdminToolbar onEdit={() => setIsEditingStory(true)} />}
                    </div>
                    <div className="order-1 md:order-2 relative">
                        <img src={storyContent.imageUrl} alt="Inside The Shop Autobody" className="rounded-lg shadow-2xl object-cover w-full h-full" />
                        {isEditingStory && (
                            <label className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold rounded-lg cursor-pointer transition-opacity">
                                Change Image
                                <input type="file" className="hidden" accept="image/*" onChange={handleStoryImageChange} />
                            </label>
                        )}
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="text-center py-16 mt-16 bg-brand-gray rounded-lg border border-brand-light-gray">
                    <h2 className="text-3xl text-text-heading mb-4">Ready to Experience the Difference?</h2>
                    <p className="text-text-muted max-w-2xl mx-auto mb-8">
                        Our dedicated team is here to provide you with top-quality service and restore your vehicle to its former glory.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/service" className="bg-brand-blue hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                            Explore Our Services
                        </Link>
                        <Link to="/contact" className="bg-brand-gray hover:brightness-125 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                            Get a Free Estimate
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;