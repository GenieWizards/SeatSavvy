import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const Header = () => {
  return (
    <Container>
      <nav className="flex items-center justify-between py-2">
        <Link href="/" className="flex items-center justify-center gap-1">
          <Image
            alt="Seat Savvy Logo"
            src={"/seatsavvy-logo.png"}
            width={50}
            height={50}
          />
          <h2>SeatSavvy</h2>
        </Link>

        <ul className="flex items-center gap-2">
          <li>
            <Link href={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
          </li>
          <li>
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};
