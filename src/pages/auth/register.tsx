import { useState } from 'react';
import { useRegisterStore } from "../../hooks/auth/useRegister"
import { InputFieldsAuth, RegisterDto, RegisterSchema } from "../../types/auth";
import { Lock, Mail, User } from "lucide-react";
import Auth from "../../components/auth/auth";
import image from '../../assets/image1.avif'
import { RegisterMutation } from "../../api/auth/auth.register";

export function Register() {
    const { formData, handleChange, resetForm } = useRegisterStore()
    const { confirmPassword, email, name, password } = formData 
    const { mutate } = RegisterMutation()
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({}); //validation erorrr

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // biar ga gampang 
        
        const result = RegisterSchema.safeParse({ name, email, password, confirmPassword });
        
        if (result.success) {
            mutate(result.data as RegisterDto);
            resetForm()
            setValidationErrors({}); // Reset errors
        } else {
            const errors = result.error.flatten().fieldErrors;
            const formattedErrors: Record<string, string> = {};
            
            Object.keys(errors).forEach(key => {
                formattedErrors[key] = errors[key as keyof typeof errors]?.[0] || '';
            });
            
            setValidationErrors(formattedErrors);
        }
    };

    const inputfields: InputFieldsAuth[] = [
        {
            id: "name",
            name: "name",
            type: "string",
            label: "Username",
            onChange: handleChange,
            Icon: (
                <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            ),
            placeholder: "Enter Username",
            value: formData.name,
            error: validationErrors.name, // Tambahkan error
        },
        {
            id: "email",
            name: "email",
            label: "Email",
            type: "email",
            onChange: handleChange,
            Icon: (
                <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            ),
            placeholder: "Enter Email",
            value: formData.email,
            error: validationErrors.email, // Tambahkan error
        },
        {
            id: "password",
            name: "password",
            label: "Password",
            isPassword: true,
            Icon: (
                <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            ),
            type: "string",
            onChange: handleChange,
            placeholder: "Enter password",
            value: formData.password,
            error: validationErrors.password, // Tambahkan error
        },
        {
            id: "confirmPassword",
            name: "confirmPassword",
            label: "Confirm Password",
            isPassword: true,
            Icon: (
                <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
            ),
            type: "string",
            onChange: handleChange,
            placeholder: "Confirm password",
            value: formData.confirmPassword,
            error: validationErrors.confirmPassword, // Tambahkan error
        }
    ];

    return (
        <Auth 
            fields={inputfields} 
            image={image} 
            onSubmit={handleSubmit} 
            step="signup"
        />
    )
}