import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url }) => {
    const siteTitle = "The Shop Autobody";
    const fullTitle = `${title} | ${siteTitle}`;
    const defaultKeywords = "Autobody shops Burnaby BC, Collision Repair Burnaby, Auto Painting Burnaby, Car Scratch Repair, Dent Removal Burnaby";

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={`${defaultKeywords}, ${keywords || ''}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Canonical */}
            {url && <link rel="canonical" href={url} />}
        </Helmet>
    );
};

export default SEO;
