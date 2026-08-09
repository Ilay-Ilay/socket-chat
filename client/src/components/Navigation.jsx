import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import Button from "./Button";

function Navigation() {
  return (
    <header className="flex items-center justify-center gap-4 px-4 py-8">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button label={"Login"} />
        </SignInButton>

        <SignUpButton mode="modal">
          <Button label={"Sign Up"} />
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}

export default Navigation;
