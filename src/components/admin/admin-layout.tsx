'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  GalleryHorizontal,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '../logo';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/admin" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive('/admin')}
                  icon={<LayoutDashboard />}
                >
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/admin/students" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive('/admin/students')}
                  icon={<Users />}
                >
                  Students
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/admin/results" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive('/admin/results')}
                  icon={<BookOpen />}
                >
                  Results
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/admin/gallery" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive('/admin/gallery')}
                  icon={<GalleryHorizontal />}
                >
                  Gallery
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/admin/settings" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive('/admin/settings')}
                  icon={<Settings />}
                >
                  Settings
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center border-b px-4 lg:h-14">
          <SidebarTrigger />
          <h1 className="ml-4 text-lg font-semibold">Admin Panel</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
