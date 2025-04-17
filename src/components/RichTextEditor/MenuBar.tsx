import { BoldIcon, Heading1, Heading2, Heading3, ItalicIcon, StrikethroughIcon } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Editor } from '@tiptap/react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    const OPTIONS = [
        {
            icon: <Heading1 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <BoldIcon />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
        },
        {
            icon: <ItalicIcon />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
        },
        {
            icon: <StrikethroughIcon />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
        },
    ];

    return (
        <div className="border-b space-x-2">
            {OPTIONS.map((option, index) => (
                <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}>
                    {option.icon}
                </Toggle>
            ))}
        </div>
    );
};

export default MenuBar;
