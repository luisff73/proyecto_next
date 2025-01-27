import FacturaFacilLogo from '@/app/ui/factura-facil';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next'; // importamos Metadata de next para poder cambiar el titulo de la pagina

export const metadata: Metadata = {
  title: 'Login',  // esto funcionaria pero es estatico y no se puede cambiar
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
          <div className="w-32 md:w-36">
            <FacturaFacilLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}