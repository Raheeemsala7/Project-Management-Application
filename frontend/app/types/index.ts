export interface LoginResponse {
    message: string;
    user: {
        _id: string;
        name: string;
        email: string;
        is2FAEnabled: boolean;
        isEmailVerified: boolean;
        createdAt: string;
        updatedAt: string;
        lastLogin: string;
        __v: number;
    }
}