interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

export default function Button({children, onClick}: ButtonProps){
    return (
        <div onClick={onClick}>{children}</div>
    )
}