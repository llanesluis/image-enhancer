import Collection from "@/components/sections/Collection";
import AlertNoCredits from "@/components/shared/AlertNoCredits";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  searchParams: {
    page: number;
  };
}
export default async function ProfilePage({
  searchParams: { page },
}: ProfilePageProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  if (!user?._id) redirect("/sign-in");

  const userImages = await getUserImages({
    userId: user._id,
    page,
  });

  const creditBalance = user.creditBalance || 0;

  return (
    <main className="container py-16">
      <Header title="Mi perfil" />

      <section className=" my-6 flex items-center gap-4 max-md:flex-col max-md:items-start">
        {/* creditos disponibles */}
        <div className="flex items-center gap-4 rounded-md border p-4 max-md:w-full max-md:p-2">
          <p className="text-sm font-bold uppercase">Creditos disponibles: </p>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={40}
              height={40}
              className="size-8 md:size-10"
            />
            <h2 className="text-lg text-accentcolor">{user.creditBalance}</h2>
          </div>
        </div>

        {/* transformaciones */}
        <div className="flex items-center gap-4 rounded-md border p-4 max-md:w-full max-md:p-2">
          <p className="text-sm font-bold uppercase">
            Transformaciones hechas:
          </p>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={40}
              height={40}
              className="size-8 md:size-10"
            />
            <h2 className="text-lg text-accentcolor">
              {userImages?.data.length}
            </h2>
          </div>
        </div>
      </section>

      {creditBalance <= 5 && <AlertNoCredits creditBalance={creditBalance} />}

      <section className="mt-10 border-t border-accentcolor/20 pt-10">
        <Collection images={userImages?.data} hasSearch={false} page={1} />
      </section>
    </main>
  );
}
