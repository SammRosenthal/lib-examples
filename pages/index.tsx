import { Dialog } from "@headlessui/react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Dialog open onClose={() => { }} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white border shadow">
          <Dialog.Title className="border-b-4 mb-2 p-2">Table</Dialog.Title>
          <Dialog.Description>
            <ul className="p-2 pt-1">
              <li className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                <Link href="/table">Basic Table</Link>
              </li>
              <li className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                <Link href="/table/withSorting">Table With Sorting</Link></li>
              <li className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                <Link href="/table/withPagination">Table With Pagination</Link></li>
            </ul>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Home;
