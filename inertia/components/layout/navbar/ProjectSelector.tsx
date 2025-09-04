import React, { useState, useRef, useEffect } from 'react'
import { usePage, Form, Link } from '@inertiajs/react'
import { ChevronDown, Check, FolderKanban, Plus } from 'lucide-react'
import { route } from '@izzyjs/route/client'
import Project from '#models/project'

interface PageProps {
  currentProject?: Project
  allProjects?: Project[] | null
  [key: string]: any
}

const ProjectSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currentProject, allProjects } = usePage<PageProps>().props

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentProjectData =
    currentProject && allProjects ? allProjects.find((p) => p.id === currentProject?.id) : null
  const displayText = currentProjectData ? currentProjectData.name : 'Select a Project'
  const hasProjects = allProjects && allProjects.length > 0
  const noProjectSelected = !currentProjectData

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-w-48 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none md:min-w-80 md:px-4 md:py-3 ${
          noProjectSelected
            ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500'
            : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500'
        }`}
      >
        <FolderKanban
          className={`h-4 w-4 ${noProjectSelected ? 'text-red-500' : 'text-indigo-500'}`}
        />
        <span className="flex-1 truncate text-left">{displayText}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
            noProjectSelected ? 'text-red-400' : 'text-indigo-400'
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 left-0 z-50 mt-1 w-72 origin-top-right overflow-hidden rounded-xl border border-gray-300 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all md:right-0 md:left-auto md:w-80">
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-800">Switch Project</p>
            <p className="text-xs text-gray-600">Select a project to work with</p>
          </div>
          <div className="max-h-64 overflow-y-auto p-1.5">
            {hasProjects ? (
              allProjects.map((project) => (
                <Form
                  key={project.id}
                  method="post"
                  action={route('projects.switch')}
                  transform={(data) => ({ ...data, projectId: project.id })}
                  onSuccess={() => {
                    setIsOpen(false)
                  }}
                >
                  {({ processing }) => (
                    <button
                      type="submit"
                      disabled={processing}
                      onClick={(e) => {
                        if (project.id === currentProject?.id) {
                          e.stopPropagation()
                          e.preventDefault()
                          setIsOpen(false)
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        <FolderKanban className="h-4 w-4 text-gray-500" />
                        <span className="truncate">{project.name}</span>
                      </div>
                      {currentProject?.id === project.id && (
                        <Check className="h-4 w-4 text-indigo-600" />
                      )}
                    </button>
                  )}
                </Form>
              ))
            ) : (
              <div className="px-3 py-6 text-center">
                <FolderKanban className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-sm font-medium text-gray-900">No projects yet</p>
                <p className="mb-4 text-xs text-gray-500">
                  Create your first project to get started
                </p>
                <Link
                  href={route('projects.create')}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="h-4 w-4" />
                  Create Project
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectSelector
