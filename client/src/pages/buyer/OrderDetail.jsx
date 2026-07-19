import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FaBoxOpen } from "react-icons/fa";
import "./css/OrderDetail.css";
import { getOrderDetail } from "../../api/buyerService";

const formatTaka = (amount) => `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const formatDateTime = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusClass = (status) => {
  if (!status) return "";
  return `status ${status.toLowerCase().replace(/\s+/g, "-")}`;
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getOrderDetail(id);
        setOrder(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleInvoiceDownload = () => {
    if (!order) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header band
    doc.setFillColor(21, 128, 61);
    doc.rect(0, 0, pageWidth, 32, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("AgriNexus Marketplace", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Invoice", pageWidth - 14, 20, { align: "right" });

    doc.setTextColor(30, 30, 30);
    let y = 46;

    // Order meta
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Order No:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.order_unique_id), 50, y);

    doc.setFont("helvetica", "bold");
    doc.text("Order Date:", 120, y);
    doc.setFont("helvetica", "normal");
    doc.text(formatDate(order.created_at), 155, y);

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Order Status:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.order_status), 50, y);

    if (order.delivery_status && order.delivery_status !== order.order_status) {
      doc.setFont("helvetica", "bold");
      doc.text("Delivery Status:", 120, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(order.delivery_status), 160, y);
    }

    y += 10;
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, pageWidth - 14, y);

    // Shipment section
    y += 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(21, 128, 61);
    doc.text("Shipment", 14, y);
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("From:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.farm_name || "-"} - ${order.pickup_location || "N/A"}`, 40, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Farmer:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.farmer_name || "-"), 40, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("To:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.drop_location || "N/A"), 40, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Buyer:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.buyer_name || "-"), 40, y);

    y += 10;
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, pageWidth - 14, y);

    // Driver section (only if assigned)
    if (order.driver_name) {
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(21, 128, 61);
      doc.text("Driver & Vehicle", 14, y);
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(10);

      y += 8;
      doc.setFont("helvetica", "bold");
      doc.text("Driver Name:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(order.driver_name), 50, y);

      doc.setFont("helvetica", "bold");
      doc.text("Phone:", 120, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(order.driver_phone || "N/A"), 145, y);

      y += 7;
      doc.setFont("helvetica", "bold");
      doc.text("Vehicle No:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(order.vehicle_number || "N/A"), 50, y);

      y += 10;
      doc.setDrawColor(220, 220, 220);
      doc.line(14, y, pageWidth - 14, y);
    }

    // Delivery timeline (only if started)
    if (order.assigned_at) {
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(21, 128, 61);
      doc.text("Delivery Timeline", 14, y);
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(10);

      const timelineSteps = [
        ["Assigned", order.assigned_at],
        ["Picked Up", order.picked_up_at],
        ["In Transit", order.in_transit_at],
        ["Delivered", order.delivered_at],
      ];

      timelineSteps.forEach(([label, ts]) => {
        y += 8;
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 14, y);
        doc.setFont("helvetica", "normal");
        doc.text(ts ? formatDateTime(ts) : "-", 50, y);
      });

      y += 10;
      doc.setDrawColor(220, 220, 220);
      doc.line(14, y, pageWidth - 14, y);
    }

    // Item / amount table
    y += 12;
    doc.setFillColor(245, 247, 245);
    doc.rect(14, y - 6, pageWidth - 28, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text("Description", 18, y);
    doc.text("Qty (tons)", pageWidth - 78, y, { align: "right" });
    doc.text("Amount (BDT)", pageWidth - 18, y, { align: "right" });

    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${order.crop_name || "Item"}${order.grade ? ` (${order.grade})` : ""}`, 18, y);
    doc.text(String(order.quantity_tons), pageWidth - 78, y, { align: "right" });
    doc.text(`Tk ${Number(order.total_price).toLocaleString("en-BD")}`, pageWidth - 18, y, {
      align: "right",
    });

    y += 8;
    doc.setDrawColor(230, 230, 230);
    doc.line(14, y, pageWidth - 14, y);

    // Total row
    y += 12;
    doc.setFillColor(240, 253, 244);
    doc.rect(14, y - 7, pageWidth - 28, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(21, 128, 61);
    doc.text("Total", 18, y);
    doc.text(`Tk ${Number(order.total_price).toLocaleString("en-BD")}`, pageWidth - 18, y, {
      align: "right",
    });

    // Footer
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Thank you for shopping with AgriNexus Marketplace. This is a system-generated invoice.",
      14,
      285
    );

    doc.save(`invoice_${order.order_unique_id}.pdf`);
  };

  if (loading) {
    return (
      <div className="orderDetail">
        <div className="skeleton" style={{ height: 320 }} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="orderDetail">
        <div className="pageHeader">
          <h1 className="pageTitle">Order Details</h1>
        </div>
        <div className="emptyState">
          <FaBoxOpen className="emptyIcon" />
          <p>{error || "No order found."}</p>
          <button className="backBtn" onClick={() => navigate("/buyer/orders")}>
            Back to Cart & Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orderDetail">
      <div className="pageHeader">
        <h1 className="pageTitle">Order Details</h1>
        <p className="pageSubtitle">
          Full shipment and delivery information for this order.
        </p>
      </div>

      <div className="orderTopBar commonCard">
        <div>
          <span className="orderIdLabel">Order No.</span>
          <h2>{order.order_unique_id}</h2>
        </div>
        <div className="statusGroup">
          <span className={statusClass(order.order_status)}>{order.order_status}</span>
          {order.delivery_status && order.delivery_status !== order.order_status && (
            <span className={statusClass(order.delivery_status)}>
              {order.delivery_status}
            </span>
          )}
        </div>
      </div>

      <div className="detailGrid">
        <div className="detailCard commonCard">
          <h2>Shipment</h2>
          <table>
            <tbody>
              <tr>
                <td>From</td>
                <td>{order.farm_name} — {order.pickup_location || "N/A"}</td>
              </tr>
              <tr>
                <td>Farmer</td>
                <td>{order.farmer_name}</td>
              </tr>
              <tr>
                <td>To</td>
                <td>{order.drop_location || "N/A"}</td>
              </tr>
              <tr>
                <td>Buyer</td>
                <td>{order.buyer_name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="detailCard commonCard">
          <h2>Order Info</h2>
          <table>
            <tbody>
              <tr>
                <td>Crop</td>
                <td>{order.crop_name}</td>
              </tr>
              <tr>
                <td>Grade</td>
                <td>{order.grade || "N/A"}</td>
              </tr>
              <tr>
                <td>Quantity</td>
                <td>{order.quantity_tons} tons</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td className="priceCell">{formatTaka(order.total_price)}</td>
              </tr>
              <tr>
                <td>Order Date</td>
                <td>{formatDate(order.created_at)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="detailCard commonCard">
          <h2>Driver & Vehicle</h2>
          {order.driver_name ? (
            <table>
              <tbody>
                <tr>
                  <td>Driver Name</td>
                  <td>{order.driver_name}</td>
                </tr>
                <tr>
                  <td>Driver Phone</td>
                  <td>{order.driver_phone || "N/A"}</td>
                </tr>
                <tr>
                  <td>Vehicle Number</td>
                  <td>{order.vehicle_number || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="mutedText">No driver assigned yet.</p>
          )}
        </div>

        <div className="detailCard commonCard">
          <h2>Delivery Timeline</h2>
          {order.assigned_at ? (
            <ul className="timeline">
              <li className={order.assigned_at ? "done" : ""}>
                <span>Assigned</span>
                <span>{formatDateTime(order.assigned_at)}</span>
              </li>
              <li className={order.picked_up_at ? "done" : ""}>
                <span>Picked Up</span>
                <span>{formatDateTime(order.picked_up_at)}</span>
              </li>
              <li className={order.in_transit_at ? "done" : ""}>
                <span>In Transit</span>
                <span>{formatDateTime(order.in_transit_at)}</span>
              </li>
              <li className={order.delivered_at ? "done" : ""}>
                <span>Delivered</span>
                <span>{formatDateTime(order.delivered_at)}</span>
              </li>
            </ul>
          ) : (
            <p className="mutedText">Delivery has not started yet.</p>
          )}
        </div>
      </div>

      <div className="detailActions">
        <button className="backBtn" onClick={() => navigate("/buyer/orders")}>
          ← Back to Cart & Orders
        </button>
        <button className="invoiceBtn" onClick={handleInvoiceDownload}>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;