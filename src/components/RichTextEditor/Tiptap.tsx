'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import { useEffect } from 'react';

type TiptapProps = {
    onChange: (value: string) => void;
    content?: string;
};

const Tiptap = ({ onChange, content }: TiptapProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'min-h-[600px] p-2 prose focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onChange(html);
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || '');
        }
    }, [content, editor]);

    return (
        <div className="my-2 border rounded-sm bg-primary-foreground ">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
