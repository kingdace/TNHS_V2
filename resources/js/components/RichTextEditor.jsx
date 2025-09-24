import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Enter your content here...",
}) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            const toolbarOptions = [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["link"],
                ["clean"],
            ];

            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: placeholder,
                modules: {
                    toolbar: toolbarOptions,
                },
            });

            // Set initial content and trigger onChange
            if (value !== undefined) {
                quillRef.current.root.innerHTML = value || "";
                // Trigger onChange with initial content
                const html = quillRef.current.root.innerHTML;
                const text = quillRef.current.getText().trim();
                onChange(html, text);
            }

            // Listen for changes
            quillRef.current.on("text-change", () => {
                const html = quillRef.current.root.innerHTML;
                const text = quillRef.current.getText().trim();
                onChange(html, text);
            });

            setIsReady(true);
        }

        return () => {
            if (quillRef.current) {
                // Cleanup if needed
            }
        };
    }, []);

    // Update content when value prop changes (for edit mode)
    useEffect(() => {
        if (
            quillRef.current &&
            isReady &&
            value !== undefined &&
            value !== quillRef.current.root.innerHTML
        ) {
            quillRef.current.root.innerHTML = value || "";
            // Trigger onChange when value changes
            const html = quillRef.current.root.innerHTML;
            const text = quillRef.current.getText().trim();
            onChange(html, text);
        }
    }, [value, isReady, onChange]);

    return (
        <div className="rich-text-editor">
            <div ref={editorRef} style={{ minHeight: "200px" }} />
        </div>
    );
};

export default RichTextEditor;
