export type DefaultApiError = {
    status: number;
    message: string;
};

type SignUpErrorFields = 'username' | 'email' | 'password';
export type SignUpApiError = {
    status: number;
    message: string;
    errors?: Record<SignUpErrorFields, string>;
};

export type SignInApiError = {
    status: number;
    message: string;
    errors?: Record<string, string>;
};
