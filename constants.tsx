
// FIX: Import WorkItem and Testimonial types to support new constants.
import type { Service, TeamMember, Testimonial, WorkItem } from './types';

export const DEFAULT_BUSINESS_INFO = {
  name: "The Shop Autobody",
  logoUrl: 'https://res.cloudinary.com/dyjffxbef/image/upload/v1767072305/IMG_3835_mqieeq.png',
  address: "5156 Still Creek Ave, Burnaby, BC V5C 4E4",
  email: "info@theshopautobody.com",
  phone_office: "+1 (778) 260 2601",
  phone_cell: "+1 (778) 260 2600",
  // Derived fields that the context will manage
  email_mailto: "mailto:info@theshopautobody.com",
  phone_tel: "tel:17782602601",
  phone_sms: "sms:17782602600",
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.591048492061!2d-122.9734106843122!3d49.24584497932724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486765e6d628c7d%3A0x647f152175953041!2s5156%20Still%20Creek%20Ave%2C%20Burnaby%2C%20BC%20V5C%204E4!5e0!3m2!1sen!2sca!4v1678886400000"
};

export const DEFAULT_OPERATING_HOURS = {
  "Monday–Friday": "08:00 AM – 05:00 PM",
  "Saturday": "10:00 AM – 03:00 PM",
  "Sunday": "Closed",
};

// FIX: Service data structure updated to use 'iconName' for serialization,
// enabling persistence in localStorage. The actual icon component is now retrieved dynamically.
export const SERVICES: Service[] = [
  { iconName: "WrenchScrewdriverIcon", title: "Collision Repair", description: "Comprehensive repairs for vehicles damaged in collisions, restoring structural integrity and safety." },
  { iconName: "PaintBrushIcon", title: "Paint & Color Matching", description: "State-of-the-art color matching technology for a seamless, factory-finish paint job." },
  { iconName: "WrenchIcon", title: "Dent & Scratch Repair", description: "Paintless Dent Repair (PDR) and expert scratch removal to fix minor cosmetic damage." },
  { iconName: "ShieldCheckIcon", title: "Bumper & Panel Replacement", description: "OEM-quality bumper and panel replacements for a perfect fit and finish." },
  { iconName: "SparklesIcon", title: "Detailing & Refinishing", description: "Professional detailing and refinishing services to bring back your vehicle's showroom shine." },
  { iconName: "Cog6ToothIcon", title: "Oil & Brake change", description: "Keep your engine running smoothly with our professional oil and brake service." },
  { iconName: "CarIcon", title: "Wrap & Tint", description: "Enhance your car’s style and protection with our wrap and tint services." },
];

export const WHY_CHOOSE_US = [
    { title: "Certified Technicians", description: "Our team consists of highly skilled and certified professionals." },
    { title: "OEM-Grade Materials", description: "We use only the best, manufacturer-approved materials for all repairs." },
    { title: "Lifetime Workmanship Warranty", description: "We stand behind our work with a lifetime warranty on all repairs." },
]

export const TEAM_MEMBERS: TeamMember[] = [];

// FIX: Added default gallery data for the "Our Work" page to resolve import error.
export const OUR_WORK_GALLERY: WorkItem[] = [
    {
        before: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761629853/crashed-porsche-before_z83mde.jpg",
        after: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761022109/generate_a_photo_of_a_nice_car_preferably_a_porsche_as_a_cover_photo_for_an_autobody_website_e30rcr.jpg",
        title: "Porsche 911 - Front-End Collision",
        description: "Complete front-end restoration including frame straightening, panel replacement, and a flawless paint match. The vehicle was returned to its pre-accident condition."
    },
    {
        before: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761630132/crashed-audi-before_tlg3tq.jpg",
        after: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761630132/repaired-audi-after_qtnwka.jpg",
        title: "Audi A4 - Side Damage Repair",
        description: "Repaired extensive side panel damage, performed paintless dent removal on minor dings, and finished with a multi-stage paint correction and ceramic coating."
    },
    {
        before: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761630132/dented-truck-before_w7vgho.jpg",
        after: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761630132/repaired-truck-after_u4yzk9.jpg",
        title: "Ford F-150 - Bumper and Grill",
        description: "Replaced a damaged rear bumper and tailgate. The new parts were color-matched perfectly to the original factory paint, making the repair invisible."
    }
];

// FIX: Added default testimonials for the "Our Work" page to resolve import error.
export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The team at The Shop Autobody did an incredible job on my car. It looks better than it did before the accident! Their attention to detail is second to none.",
        author: "Sarah J.",
        vehicle: "Honda Civic"
    },
    {
        quote: "Hagop and his team are true professionals. They handled everything with my insurance company and kept me updated throughout the entire process. Highly recommended!",
        author: "Mike R.",
        vehicle: "Tesla Model 3"
    },
    {
        quote: "I brought in my classic car for some restoration work and I was blown away by the results. The craftsmanship is outstanding. This is the only shop I'll trust with my vehicles.",
        author: "David L.",
        vehicle: "1969 Chevrolet Camaro"
    }
];
