import type { ReactNode } from 'react';

export interface Service {
  // FIX: Replaced ReactNode with a serializable string identifier to allow for localStorage persistence.
  iconName: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

// FIX: Added WorkItem interface for the photo gallery to fix import error in OurWork.tsx.
export interface WorkItem {
  before: string;
  after: string;
  title: string;
  description: string;
}

// FIX: Added Testimonial interface for customer testimonials to fix import error in OurWork.tsx.
export interface Testimonial {
  quote: string;
  author: string;
  vehicle: string;
}
