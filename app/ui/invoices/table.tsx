import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
  <div className="inline-block min-w-full align-middle">
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-2 md:pt-0">
      <div className="md:hidden">
        {invoices?.map((invoice) => (
          <div key={invoice.id} className="mb-2 w-full rounded-md bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <Image
                    src={invoice.image_url}
                    className="mr-2 rounded-full"
                    width={28}
                    height={28}
                    alt={`${invoice.name}'s profile picture`}
                  />
                  <p className="dark:text-white">{invoice.name}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.email}</p>
              </div>
              <InvoiceStatus status={invoice.status} />
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p className="text-xl font-medium dark:text-white">
                  {formatCurrency(invoice.amount)}
                </p>
                <p className="dark:text-gray-300">{formatDateToLocal(invoice.date)}</p>
              </div>
              <div className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                <UpdateInvoice id={invoice.id} />
                <DeleteInvoice id={invoice.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <table className="hidden min-w-full text-gray-900 dark:text-white md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium dark:text-gray-200 sm:pl-6">
              Cliente
            </th>
            <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
              Correo electrónico
            </th>
            <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
              Total
            </th>
            <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
              Fecha
            </th>
            <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
              Estado
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {invoices?.map((invoice) => (
            <tr
              key={invoice.id}
              className="w-full border-b dark:border-gray-700 py-3 text-sm last-of-type:border-none hover:bg-gray-100 dark:hover:bg-gray-800 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={invoice.image_url}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`${invoice.name}'s profile picture`}
                  />
                  <p className="dark:text-white">{invoice.name}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3 dark:text-gray-200">
                {invoice.email}
              </td>
              <td className="whitespace-nowrap px-3 py-3 dark:text-gray-200">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="whitespace-nowrap px-3 py-3 dark:text-gray-200">
                {formatDateToLocal(invoice.date)}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <InvoiceStatus status={invoice.status} />
              </td>
              <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                <UpdateInvoice id={invoice.id} />
                <DeleteInvoice id={invoice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}
