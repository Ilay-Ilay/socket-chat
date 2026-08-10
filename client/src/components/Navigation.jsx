import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import Button from "./Button";

function Navigation() {
  return (
    <header className="flex items-center justify-center gap-4 px-4 py-8 border-b border-gray-300">
      <span>Conversations</span>
      <div>
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
      </div>
    </header>
  );
}

export default Navigation;
