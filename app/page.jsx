import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import LogoImg from "../app/Styles/ARb.svg";
import CardComponent from "@/components/CardComponent";
import Filter from "../components/Filter";
import "@/app/Styles/MainPage.scss";
import SuggestSite from "@/components/SuggestSite";
export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("archive").select();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", user?.id);
  
  if (!existingUser || existingUser.length === 0) {
    const { data: newUser } = await supabase.from("users").insert({ id: user?.id });
  } 
  

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center h-16 pt-4">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
          <div className="">
            <Image
              src={LogoImg}
              width={130}
              height={130}
              alt="Logo Image"
            ></Image>
          </div>
          <div className="header-right flex">
            {isSupabaseConnected && <AuthButton />}
            {user && <SuggestSite />}
          </div>
        </div>
      </nav>
      <Filter userData={user}></Filter>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made with ❤️ for <strong>developers</strong>.
        </p>
      </footer>
    </div>
  );
}
