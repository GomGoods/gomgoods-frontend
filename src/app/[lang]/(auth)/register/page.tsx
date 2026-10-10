import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Locale } from "@/app/[lang]/dictionaries";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <AuthLayout lang={lang as Locale} mode="register">
      <AuthBranding mode="register" />
      <RegisterForm lang={lang as Locale} />
    </AuthLayout>
  );
}
