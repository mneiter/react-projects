"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
            {children}
        </button>
    );
};
