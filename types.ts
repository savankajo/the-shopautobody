export interface Service {
  iconName: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface WorkItem {
  before: string;
  after: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  vehicle: string;
}
