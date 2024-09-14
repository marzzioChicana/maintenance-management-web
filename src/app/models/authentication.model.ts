export interface SignUpRequest{
    username: string;
    email: string;
    password: string;
}

export interface SignInRequest{
    username: string;
    password: string;
}

export interface SignInResponse{
    id: number;
    username: string;
    token: string;
}