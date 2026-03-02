'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { useCategories } from '@/hooks/use-category';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface TransactionFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function TransactionFilters({
  onFilterChange,
}: TransactionFiltersProps) {
  const [type, setType] = useState<string>('ALL');
  const [category, setCategory] = useState<string>('All');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: session } = useSession();

  const { categoriesByUser, isLoadingByUser, errorByUser, refetchByUser } =
    useCategories(session?.user?.id as string, { limit: 100 });

  const handleApplyFilters = () => {
    onFilterChange({
      type: type !== 'ALL' ? type : undefined,
      category: category !== 'All' ? category : undefined,
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
    });
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setType('ALL');
    setCategory('All');
    setStartDate(undefined);
    setEndDate(undefined);
    onFilterChange({});
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    type !== 'ALL' || category !== 'All' || startDate || endDate;

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
        <div className='space-y-2'>
          <h4 className='font-medium leading-none'>Filter Transactions</h4>

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

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>

              <SelectContent className='max-h-60 overflow-y-auto'>
                {Array.isArray(categoriesByUser)
                  ? categoriesByUser.map((category: any) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Date Range</label>
            <div className='grid grid-cols-2 gap-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate
                      ? dayjs(startDate).format('MMM DD, YYYY')
                      : 'Start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate
                      ? dayjs(endDate).format('MMM DD, YYYY')
                      : 'End date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className='flex items-center gap-2 pt-2'>
            <Button onClick={handleApplyFilters} className='flex-1'>
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
