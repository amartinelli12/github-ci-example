import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Totals } from './table-container-store/table-container.models';
import { User } from '../root-store/user.model';
import { TableContainerFacade } from './table-container.facade';
import { Observable } from 'rxjs';
import { UserViewModel } from './table-container-store/users-view.model';
import { SearchType } from './type-cards/search-type.enum';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  readonly columns$: Observable<string[]> = this.facade?.columns$;
  readonly totalCount$ = this.facade?.totalCount$;
  readonly users$: Observable<UserViewModel[]> = this.facade?.users$.pipe(
    tap((data) => {
      this.dataSource.data = data;
      if (!this.dataSource.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  );
  readonly totals$: Observable<Totals> = this.facade?.totals$;
  readonly activeSearchType$: Observable<SearchType> = this.facade?.activeSearchType$;
  readonly dataSource: MatTableDataSource<UserViewModel> = new MatTableDataSource([]);
  readonly columns: string[] = ['login', 'urls'];
  readonly PAGE_SIZE_OPTIONS: number[] = [5, 10, 20];

  constructor(
    private facade: TableContainerFacade
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(query: string) {
    this.facade.requestUsersFromGitlab(query);
  }

  isUrlsKey(key: string): boolean {
    return this.facade.isUrlsKey(key);
  }

  isLoginKey(key: string): boolean {
    return this.facade.isLoginKey(key);
  }

  navigateToGithub(url: string) {
    this.facade.navigateToGithub(url);
  }

  getElementKeys(element): string[] {
    return Object.keys(element);
  }

  setUserLinkDisplayName(user: User) {
    return user.name ?? user.login;
  }

  setSearchType(searchType: SearchType) {
    this.facade.setSearchType(searchType);
  }

  trackByLogin(index: number, login: string) {
    return login;
  }

}
