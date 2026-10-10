import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { LoginForm } from "@/components/auth/LoginForm";
import type { Locale } from "@/app/[lang]/dictionaries";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <AuthLayout lang={lang as Locale} mode="login">
      <AuthBranding mode="login" />
      <LoginForm lang={lang as Locale} />
    </AuthLayout>
  );
}
