export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    type: string;
    birthDate: Date;
    imageUrl: string;
    location: string;
}

export interface VerifyOtpBody {
    email: string;
    otp: string;
}

export interface RefreshTokenBody {
    refreshToken: string;
}

export interface ResendOtpBody {
    email: string;
}