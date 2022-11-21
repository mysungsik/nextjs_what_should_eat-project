import UserDetailComponent from "../../components/user-detail-components/user-detail-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function UserInfoPage(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <div> ...loading</div>;
  }
  if (status == "unauthenticated") {
    router.replace("/");
  }
  return (
    <UserDetailComponent
      useremail={session.user.email}
      username={session.user.name}
    />
  );
}

export default UserInfoPage;
