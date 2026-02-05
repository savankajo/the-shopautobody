import React from 'react';

interface AdminToolbarProps {
    onEdit: () => void;
    isInline?: boolean; // Default is absolute positioning for parent group with relative
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onEdit, isInline = true }) => {
    const positionClasses = isInline 
        ? 'absolute top-2 right-2 opacity-0 group-hover:opacity-100' 
        : 'mt-2';
    
    return (
        <div className={`${positionClasses} transition-opacity duration-300 z-20`}>
            <button 
                onClick={onEdit}
                className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-sm"
            >
                Edit
            </button>
        </div>
    );
};

export default AdminToolbar;
