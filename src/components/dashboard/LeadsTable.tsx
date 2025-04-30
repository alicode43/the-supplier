import React, { useState } from 'react';
import Link from 'next/link';
import { Eye,X } from 'lucide-react';

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

    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
    const [currentAttachments, setCurrentAttachments] = useState<any[]>([]);
    const [currentItemName, setCurrentItemName] = useState("");

    const openAttachmentModal = (item: any) => {
      if (!item.attachments) {
        toast.info("No attachments available for this item.");
        return;
      }
      
      if (Array.isArray(item.attachments) && item.attachments.length > 0) {
        setCurrentAttachments(item.attachments);
        setCurrentItemName(item.partName || "Item");
        setIsAttachmentModalOpen(true);
      } else {
        // If it's a single attachment (string or object)
        setCurrentAttachments(Array.isArray(item.attachments) ? item.attachments : [item.attachments]);
        setCurrentItemName(item.partName || "Item");
        setIsAttachmentModalOpen(true);
      }
    };
    
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
                <td className="px-4 py-3">
                      <button
                        onClick={() => openAttachmentModal(lead)}
                        className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold hover:bg-indigo-50"
                      >
                        <Eye size={12} className="mr-1" />
                        Attachments
                      </button>
                    </td>
                <td className="px-4 py-3">{lead.category}</td>
                <td className="px-4 py-3">{lead.material}</td>
                <td className="px-4 py-3">{lead.quantity}</td>
                <td className="px-4 py-3">{lead.price}</td>
                <td className="px-4 py-3">{lead.leadTime}</td>
                <td className="px-4 py-3">{lead.submitted}</td>
                <td className="px-4 py-3">
                  <Link href={'leads/'+lead.leadId}>
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
      {isAttachmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="font-bold text-lg">
                Attachments for {currentItemName}
              </h3>
              <button
                onClick={() => setIsAttachmentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
              {currentAttachments && currentAttachments.length > 0 ? (
                <div className="grid gap-4">
                  {currentAttachments.map((attachment, index) => {
                    const url = typeof attachment === 'object' ? attachment.url : attachment;
                    const name = typeof attachment === 'object' ? 
                      attachment.name || `Attachment ${index + 1}` : 
                      `Attachment ${index + 1}`;
                    const isImage = typeof url === 'string' && url.match(/\.(jpeg|jpg|gif|png)$/i);

                    return (
                      <div key={`attachment-${index}`} className="border rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center p-4 bg-gray-50">
                          <span className="font-medium truncate">{name}</span>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:text-indigo-700"
                          >
                            Open
                          </a>
                        </div>
                        {isImage && (
                          <div className="p-4 flex justify-center">
                            <img 
                              src={url} 
                              alt={name} 
                              className="max-h-48 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500">No attachments available</p>
              )}
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setIsAttachmentModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadsTable;
