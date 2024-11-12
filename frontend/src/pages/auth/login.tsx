import { useState } from "react";
import { LoginMutation } from "../../api/auth/auth.login";
import { useLoginStore } from "../../hooks/auth/useLogin";
import { InputFieldsAuth, LoginDto, LoginSchema } from "../../types/auth";
import { Lock, Mail, User } from "lucide-react";
import Auth from "../../components/auth/auth";
import image from '../../assets/image1.avif'


export  function LoginPage(){
   const { formData, handleChange, resetForm } = useLoginStore()
    const { email,  password } = formData 
    const { mutate } = LoginMutation()
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({}); //validation erorrr

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // biar ga gampang 
        
        const result = LoginSchema.safeParse({  email, password});
        
        if (result.success) {
            mutate(result.data as LoginDto);
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