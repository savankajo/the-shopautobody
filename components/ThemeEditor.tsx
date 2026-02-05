
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const FONT_OPTIONS = ['Inter', 'Roboto', 'Lato', 'Montserrat', 'Open Sans'];
const FONT_WEIGHT_OPTIONS = {
    '300': 'Light',
    '400': 'Normal',
    '500': 'Medium',
    '600': 'Semi-bold',
    '700': 'Bold',
    '800': 'Extra-bold',
    '900': 'Black',
};
const TEXT_TRANSFORM_OPTIONS = ['none', 'capitalize', 'uppercase', 'lowercase'];

const ThemeEditor: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { theme, setTheme, isEditorOpen, toggleEditor, resetTheme } = useTheme();

  if (!isLoggedIn || !isEditorOpen) {
    return null;
  }
  
  const handleColorChange = (key: keyof typeof theme.colors, value: string) => {
    setTheme(prev => ({...prev, colors: { ...prev.colors, [key]: value } }));
  }

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(prev => ({ ...prev, fontFamily: e.target.value }));
  };

  const handleTypographyChange = (
      type: 'heading' | 'body',
      property: 'fontWeight' | 'textTransform',
      value: string
  ) => {
      setTheme(prev => ({
          ...prev,
          typography: {
              ...prev.typography,
              [type]: {
                  ...prev.typography[type],
                  [property]: value
              }
          }
      }));
  }

  return (
    <div className="fixed bottom-4 right-4 bg-brand-dark border-2 border-brand-light-gray rounded-lg shadow-2xl z-50 p-6 w-full max-w-xs text-text-body">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-text-heading">Theme Customizer</h3>
        <button onClick={toggleEditor} className="text-text-muted hover:text-text-heading text-2xl leading-none">&times;</button>
      </div>
      
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <h4 className="font-semibold mb-3 text-text-muted">Brand Colors</h4>
          <div className="space-y-4">
            <ColorInput label="Primary / Accent" colorKey="primary" value={theme.colors.primary} onChange={handleColorChange} />
            <ColorInput label="Main Background" colorKey="background" value={theme.colors.background} onChange={handleColorChange} />
            <ColorInput label="Header / Footer / Cards" colorKey="card" value={theme.colors.card} onChange={handleColorChange} />
            <ColorInput label="Borders / Inputs" colorKey="border" value={theme.colors.border} onChange={handleColorChange} />
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-text-muted">Text Colors</h4>
          <div className="space-y-4">
            <ColorInput label="Headings" colorKey="textHeading" value={theme.colors.textHeading} onChange={handleColorChange} />
            <ColorInput label="Body" colorKey="textBody" value={theme.colors.textBody} onChange={handleColorChange} />
            <ColorInput label="Muted" colorKey="textMuted" value={theme.colors.textMuted} onChange={handleColorChange} />
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-text-muted">Typography</h4>
          <div className="mb-4">
            <label htmlFor="font-family" className="block text-sm text-text-body mb-1">Font Family</label>
            <select
              id="font-family"
              value={theme.fontFamily}
              onChange={handleFontChange}
              className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-2 text-text-body"
            >
              {FONT_OPTIONS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
          <div className="p-3 bg-brand-light-gray/50 rounded-md space-y-3">
            <h5 className="font-bold text-text-heading">Headings</h5>
            <TypographyInput
              type="heading"
              fontWeight={theme.typography.heading.fontWeight}
              textTransform={theme.typography.heading.textTransform}
              onChange={handleTypographyChange}
            />
          </div>
          <div className="mt-4 p-3 bg-brand-light-gray/50 rounded-md space-y-3">
            <h5 className="font-bold text-text-heading">Body</h5>
            <TypographyInput
              type="body"
              fontWeight={theme.typography.body.fontWeight}
              textTransform={theme.typography.body.textTransform}
              onChange={handleTypographyChange}
            />
          </div>
        </div>
      </div>
       <div className="mt-6">
          <button onClick={resetTheme} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
            Reset to Defaults
          </button>
        </div>
    </div>
  );
};

interface ColorInputProps {
    label: string;
    colorKey: keyof ReturnType<typeof useTheme>['theme']['colors'];
    value: string;
    onChange: (key: keyof ReturnType<typeof useTheme>['theme']['colors'], value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, colorKey, value, onChange }) => {
    return (
        <div>
            <label className="flex justify-between items-center text-sm text-text-body">
                <span>{label}</span>
                <span className='font-mono uppercase'>{value}</span>
            </label>
            <div className="flex items-center mt-1">
                <input 
                    type="color" 
                    value={value} 
                    onChange={e => onChange(colorKey, e.target.value)} 
                    className="w-10 h-10 p-0 border-none rounded cursor-pointer bg-transparent"
                    style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', 'appearance': 'none'}}
                />
                 <input
                    type="text"
                    value={value}
                    onChange={e => onChange(colorKey, e.target.value)}
                    className="ml-2 w-full bg-brand-light-gray border border-gray-600 rounded-md py-1 px-2 text-text-body font-mono uppercase"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                />
            </div>
        </div>
    )
}

interface TypographyInputProps {
    type: 'heading' | 'body';
    fontWeight: string;
    textTransform: string;
    onChange: (type: 'heading' | 'body', property: 'fontWeight' | 'textTransform', value: string) => void;
}

const TypographyInput: React.FC<TypographyInputProps> = ({ type, fontWeight, textTransform, onChange }) => {
    return (
        <>
            <div>
                <label htmlFor={`${type}-font-weight`} className="block text-sm text-text-body mb-1">Font Weight</label>
                <select id={`${type}-font-weight`} value={fontWeight} onChange={(e) => onChange(type, 'fontWeight', e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-2 text-text-body">
                    {Object.entries(FONT_WEIGHT_OPTIONS).map(([value, label]) => (
                        <option key={value} value={value}>{label} ({value})</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor={`${type}-text-transform`} className="block text-sm text-text-body mb-1">Text Transform</label>
                <select id={`${type}-text-transform`} value={textTransform} onChange={(e) => onChange(type, 'textTransform', e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-2 text-text-body">
                     {TEXT_TRANSFORM_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="capitalize">{opt}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default ThemeEditor;
