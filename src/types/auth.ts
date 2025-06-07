export interface Logo {
  _id: string;
  public_url_firebase: string;
  local_short_url: string;
}

export interface Company {
  _id: string;
  key: string;
  logo: Logo[];
  name: string;
}

export interface LoginResponse {
  _id: string;
  user: string;
  email: string;
  surveyStart: boolean;
  company: Company;
  token: string;
}

export interface LoginCredentials {
  mail: string;
  pass: string;
}

export interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
