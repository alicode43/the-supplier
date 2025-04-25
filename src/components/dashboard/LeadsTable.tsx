import React from 'react';
import Link from 'next/link';

export interface Lead {
  leadId: string;
  partName: string;
  category: string;
  material: string;
  quantity: number | string;
  price: string;
  leadTime: string;
  submitted: string;
  viewUrl?: string;
}

interface LeadsTableProps {
  leads: Lead[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  viewAllUrl?: string;
  className?: string;
}

const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  title = "Recent Leads",
  showViewAll = true,
  onViewAll,
  viewAllUrl = "#",
  className = ""
}) => {
  return (
    <section className={`w-full px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-black">
          {title}
        </h2>
        {showViewAll && (
          <button 
            onClick={onViewAll} 
            className="text-xs font-bold text-black underline"
          >
            {viewAllUrl && !onViewAll ? (
              <Link href={viewAllUrl}>View All</Link>
            ) : (
              "View All"
            )}
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Lead ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Part Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Material
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Your Price/Pcs
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Your Lead Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Submitted On
              </th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-black font-semibold">
            {leads.map((lead, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{lead.leadId}</td>
                <td className="px-4 py-3">{lead.partName}</td>
                <td className="px-4 py-3">{lead.category}</td>
                <td className="px-4 py-3">{lead.material}</td>
                <td className="px-4 py-3">{lead.quantity}</td>
                <td className="px-4 py-3">{lead.price}</td>
                <td className="px-4 py-3">{lead.leadTime}</td>
                <td className="px-4 py-3">{lead.submitted}</td>
                <td className="px-4 py-3">
                  <Link href={lead.viewUrl || "#"}>
                    <button className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                  No leads available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeadsTable;
