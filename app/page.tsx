import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Image from "next/image";
import LogoImg from "../app/Styles/ARw.svg";
import CardComponent from "@/components/CardComponent";
import Filter from "../components/Filter";
import "@/app/Styles/MainPage.scss";

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

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center h-16 pt-4">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="">
            <Image
              src={LogoImg}
              width={100}
              height={100}
              alt="Logo Image"
            ></Image>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <Filter></Filter>
      <div className="cards-container">
        {data?.map((item) => (
          <CardComponent
            key={item.id}
            title={item.site_name}
            description={item.site_desc}
            type={item.site_type}
            image={item.image_url}
            url={item.site_url}
          />
        ))}
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made with ❤️ for <strong>developers</strong>.
        </p>
      </footer>
    </div>
  );
}
