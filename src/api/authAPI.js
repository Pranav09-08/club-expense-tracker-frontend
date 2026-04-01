const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const ROLE_CODE_TO_ROUTE_ROLE = {
	ADMIN: "admin",
	COORDINATOR: "coordinator",
	STUDENT_LEAD: "club_lead",
	FINANCE_LEAD: "finance_lead",
	MEMBER: "member",
	STATIONARY_ADMIN: "stationary_admin",
};

const ROLE_TO_DASHBOARD_PATH = {
	admin: "/admin-dashboard",
	coordinator: "/coordinator-dashboard",
	club_lead: "/club-lead-dashboard",
	finance_lead: "/finance-dashboard",
	member: "/member-dashboard",
	stationary_admin: "/stationary-dashboard",
};

async function apiRequest(path, options = {}) {
	const token = localStorage.getItem("accessToken");
	const headers = {
		"Content-Type": "application/json",
		...(options.headers || {}),
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers,
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data?.message || "Request failed");
	}

	return data;
}

export function mapRoleCodeToRouteRole(roleCode) {
	return ROLE_CODE_TO_ROUTE_ROLE[roleCode] || "member";
}

export function getDashboardPathFromRole(routeRole) {
	return ROLE_TO_DASHBOARD_PATH[routeRole] || "/";
}

export async function login(payload) {
	const data = await apiRequest("/auth/login", {
		method: "POST",
		body: JSON.stringify(payload),
	});

	const activeRoleCode = data?.activeRole?.roleCode;
	const routeRole = mapRoleCodeToRouteRole(activeRoleCode);

	localStorage.setItem("accessToken", data.accessToken);
	localStorage.setItem(
		"user",
		JSON.stringify({
			...data.user,
			role: routeRole,
			roleCode: activeRoleCode,
			activeClubId: data?.activeRole?.clubId || null,
			availableRoles: data?.availableRoles || [],
		})
	);

	return {
		...data,
		routeRole,
		dashboardPath: getDashboardPathFromRole(routeRole),
	};
}

export async function getCurrentUser() {
	return apiRequest("/auth/me", { method: "GET" });
}

export async function logout() {
	try {
		await apiRequest("/auth/logout", { method: "POST" });
	} finally {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("user");
	}
}

export async function createClub(payload) {
	return apiRequest("/admin/clubs", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function listClubs() {
	return apiRequest("/admin/clubs", { method: "GET" });
}

export async function createCoordinator(payload) {
	return apiRequest("/admin/coordinators", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function listCoordinatorsByClub(clubId) {
	return apiRequest(`/admin/clubs/${clubId}/coordinators`, { method: "GET" });
}

export async function createLead(payload) {
	return apiRequest("/coordinator/leads", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function listLeads() {
	return apiRequest("/coordinator/leads", { method: "GET" });
}

export async function createMember(payload) {
	return apiRequest("/student-lead/members", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function listMembers() {
	return apiRequest("/student-lead/members", { method: "GET" });
}
