'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface CategoryFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function CategoryFilters({ onFilterChange }: CategoryFiltersProps) {
  const [type, setType] = useState<string>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      type: type !== 'ALL' ? type : undefined,
    });
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setType('ALL');
    onFilterChange({});
    setIsFilterOpen(false);
  };

  const hasActiveFilters = type !== 'ALL';

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='relative'>
          <Filter className='mr-2 h-4 w-4' />
          Filters
          {hasActiveFilters && (
            <span className='absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350px] p-4' align='start'>
        <div className='space-y-4'>
          <h4 className='font-medium leading-none'>Filter Categories</h4>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ALL'>All</SelectItem>
                <SelectItem value='INCOME'>Income</SelectItem>
                <SelectItem value='EXPENSE'>Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2 pt-2'>
            <Button onClick={handleApplyFilters} className=''>
              Apply Filters
            </Button>
            <Button variant='outline' onClick={handleClearFilters} size='icon'>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
